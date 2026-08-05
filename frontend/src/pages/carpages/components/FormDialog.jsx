import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel
} from "@/components/ui/select"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";


const formSchema = z.object({
    license_plate: z.string().min(1, "กรุณากรอกทะเบียนรถ"),
    province: z.string().min(1, "กรุณากรอกจังหวัด"),
    brand: z.string().min(1, "กรุณากรอกยี่ห้อ"),
    car_model: z.string().min(1, "กรุณากรอกรุ่น"),
    year: z.coerce.number().min(1500, "ปีไม่ถูกต้อง >= 1500"),
    color: z.string().min(1, "กรุณากรอกสี"),
    chassis_number: z.string().min(1, "กรุณากรอกหมายเลขตัวถัง"),
    engine_number: z.string().min(1, "กรุณากรอกหมายเลขเครื่องยนต์"),
    fuel_type: z.string().min(1, "กรุณากรอกประเภทรถ"),
    remark: z.string().optional(),
    status: z.string().optional(),
});

const defaultValues = {
    license_plate: "",
    province: "",
    brand: "",
    car_model: "",
    year: "",
    color: "",
    fuel_type: "",
    chassis_number: "",
    engine_number: "",
    remark: "",
    status: "",
};

const provinceItem = [
    { label: "กรุงเทพมหานคร", value: "กรุงเทพมหานคร" },
    { label: "ระยอง", value: "ระยอง" },
    { label: "ชลบุรี", value: "ชลบุรี" },
]

const brandItems = [
    { label: "Toyota", value: "Toyota" },
    { label: "Honda", value: "Honda" },
    { label: "Isuzu", value: "Isuzu" },
]

const fuelItems = [
    { label: "เบนซิน", value: "เบนซิน" },
    { label: "ดีเซล", value: "ดีเซล" },
    { label: "ไฮบริด", value: "ไฮบริด" },
    { label: "ไฟฟ้า", value: "ไฟฟ้า" },
]

const statusItem = [
    { label: "พร้อมใช้งาน", value: "พร้อมใช้งาน" },
    { label: "กำลังใช้งาน", value: "กำลังใช้งาน" },
    { label: "ซ่อมบำรุง", value: "ซ่อมบำรุง" },
]


export function CarFormDialog({ open, onOpenChange, mode = 'create', initialData, onSubmit, onEdit, onDelete }) {
    const isView = mode === 'view';

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    useEffect(() => {
        if (open) {
            form.reset(initialData ? { ...defaultValues, ...initialData } : defaultValues)
        }
    }, [open, initialData])

    async function onValid(values) {
        try {
            await onSubmit(values)
            onOpenChange(false);
        } catch (error) {
            console.log("Error saving car:", error);
        }
    }

    const titleMap = {
        create: "เพิ่มรถยนต์",
        edit: "แก้ไขรถยนต์",
        view: "รายละเอียดรถยนต์",
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md md:max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-md font-semibold">{titleMap[mode]}</DialogTitle>
                </DialogHeader>

                <form
                    id="car-form"
                    onSubmit={form.handleSubmit(onValid)}
                >
                    <FieldGroup className="flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="license_plate"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-license_plate">
                                            ทะเบียนรถ <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-license_plate"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="กข 1234"
                                            disabled={isView}

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="province"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-province">
                                            จังหวัด <span className="text-red-500">*</span>
                                        </FieldLabel>

                                        <Select value={field.value} onValueChange={field.onChange} disabled={isView}>
                                            <SelectTrigger id="form-province" >
                                                <SelectValue placeholder="เลือกจังหวัด" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>จังหวัด</SelectLabel>
                                                    {provinceItem.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />


                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="brand"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-brand">
                                            ยี่ห้อ <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange} disabled={isView}>
                                            <SelectTrigger id="form-brand">
                                                <SelectValue placeholder="เลือกยี่ห้อ" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>ยี่ห้อรถยนต์</SelectLabel>
                                                    {brandItems.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="car_model"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-car_model">
                                            รุ่น <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-car_model"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Yaris"
                                            disabled={isView}

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <Controller
                                name="year"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-year">
                                            ปี <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-year"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="2024"
                                            disabled={isView}

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="color"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-color">
                                            สี <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-color"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="ขาว"
                                            disabled={isView}

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="fuel_type"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-fuel_type">
                                            ประเภทเชื้อเพลิง <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange} disabled={isView}>
                                            <SelectTrigger id="form-fuel_type">
                                                <SelectValue placeholder='เลือกประเภทเชื้อเพลิง' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>ประเภทรถยนต์</SelectLabel>
                                                    {fuelItems.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />


                        </div>


                        <div className="grid grid-cols-3 gap-4">
                            <Controller
                                name="chassis_number"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-chassis_number">
                                            หมายเลขตัวถัง <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-chassis_number"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="M5dsagaf34345"
                                            disabled={isView}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="engine_number"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-engine_number">
                                            หมายเลขเครื่อง <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-engine_number"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="1TRF3456"
                                            disabled={isView}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="status"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-status">
                                            สถานะ <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange} disabled={isView}>
                                            <SelectTrigger id="form-status">
                                                <SelectValue placeholder="เลือกสถานะ" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>สถานะ</SelectLabel>
                                                    {statusItem.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />


                        </div>

                        <Controller
                            name="remark"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-remark">หมายเหตุ</FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="form-remark"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="หมายเหตุ"
                                        disabled={isView}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </form>

                <DialogFooter className="sm:justify-start">
                    {isView ? (
                        <div className="flex gap-2 w-full justify-between">
                            <button type="button" onClick={() => onOpenChange(false)} className="border border-gray-100 hover:bg-gray-100 text-gray-700 cursor-pointer px-4 py-2 rounded-lg text-sm font-medium">ปิด</button>
                            <div className='flex gap-2'>
                                <button type="button" onClick={onDelete} className="bg-rose-700 hover:bg-rose-800 text-white cursor-pointer px-3 py-2 rounded-md">ลบ</button>
                                <button type="button" onClick={onEdit} className="bg-gray-700 hover:bg-gray-800 text-white cursor-pointer px-3 py-2 rounded-md">แก้ไข</button>
                            </div>

                        </div>
                    ) : (
                        <div className='flex justify-between w-full'>

                            <button type="button" onClick={() => onOpenChange(false)} className="border border-gray-100 text-gray-700 cursor-pointer px-4 py-2 rounded-md">ปิด</button>
                            <button type="submit" form="car-form" className="bg-[#96c064] text-white cursor-pointer px-4 py-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors" disabled={!form.formState.isDirty} >บันทึก</button>
                        </div>
                    )
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}