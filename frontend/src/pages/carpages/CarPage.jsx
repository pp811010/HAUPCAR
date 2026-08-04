import { Plus } from 'lucide-react';
import CarTable from '@/pages/carpages/components/CarTable';
import { useEffect } from 'react';
import { useState } from 'react';
import { createCar, fetchCars, updateCar, deleteCar } from '@/api/carApi';
import { CarFormDialog } from './components/FormDialog';
import { toast } from 'react-toastify';


export default function CarPage() {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [search, setSearch] = useState("");
    const [filterCar, setFilterCar] = useState([]);



    useEffect(() => {
        if (search === "") return setFilterCar(cars);
        const filteredCars = cars.filter((car) => {
            return car.license_plate.toLowerCase().includes(search.toLowerCase()) || car.car_model.toLowerCase().includes(search.toLowerCase()) || car.province.toLowerCase().includes(search.toLowerCase()) || car.brand.toLowerCase().includes(search.toLowerCase())
        })

        setFilterCar(filteredCars)
    }, [search])

    async function loadCars() {
        const res = await fetchCars();
        setCars(res)
        setFilterCar(res)
    }

    useEffect(() => {
        loadCars();
    }, [])

    function handleAddClick() {
        setSelectedCar(null)
        setMode("create")
        setOpen(true)
    }

    function handleRowClick(car) {
        setSelectedCar(car)
        setMode("view")
        setOpen(true)
    }

    async function handleSubmit(value) {
        try {
            if (mode === 'edit') {
                console.log(selectedCar.id)
                await updateCar(selectedCar.id, value)
                toast.success("แก้ไขข้อมูลรถยนต์สำเร็จ");
            } else {
                await createCar(value)
                toast.success("เพิ่มข้อมูลรถยนต์สำเร็จ");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        } finally {
            await loadCars()
        }
    }

    async function handleDelete() {
        try {
            if (!selectedCar) return;
            if (!confirm(`ยืนยันลบรถทะเบียน ${selectedCar.license_plate}?`)) return;
            await deleteCar(selectedCar.id);
            setOpen(false);
            toast.success("ลบข้อมูลรถยนต์สำเร็จ");
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "เกิดข้อผิดพลาดในการลบ");
        } finally {
            await loadCars();
        }
    }

    return (
        <div className='flex flex-col gap-5'>

            <div className="flex flex-col md:flex-row justify-between gap-4 pb-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Car List</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        จัดการข้อมูลรถยนต์ในระบบ มีรถยนต์ทั้งหมดในระบบ <span className="font-semibold text-[#fe5b23]">{cars.length}</span> คัน
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="ค้นหา ทะเบียน, ยี่ห้อ, จังหวัด"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#445bef] w-64 transition-all"
                    />
                    <button
                        onClick={handleAddClick}
                        className="bg-[#445bef] hover:bg-[#3449d1] text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                        <Plus size={16} />
                        เพิ่มรถยนต์
                    </button>
                </div>
            </div>


            <CarTable data={filterCar} onRowClick={handleRowClick} />

            <CarFormDialog
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                initialData={selectedCar}
                onSubmit={handleSubmit}
                onEdit={() => setMode("edit")}
                onDelete={handleDelete}
            />
        </div>
    )
}