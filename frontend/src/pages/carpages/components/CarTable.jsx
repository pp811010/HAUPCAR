import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const styleStatus = {
  'พร้อมใช้งาน': 'bg-green-200 rounded-xl text-green-900 px-2 py-1 text-xs text-center',
  'กำลังใช้งาน': 'bg-yellow-200 rounded-xl text-yellow-900 px-2 py-1 text-xs text-center',
  'ซ่อมบำรุง': 'bg-red-200 rounded-xl text-red-900 px-2 py-1 text-xs text-center',
}

export default function CarTable({ data, onRowClick }) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px] px-6 py-3">ทะเบียนรถ</TableHead>
          <TableHead className="px-6 py-3">จังหวัด</TableHead>
          <TableHead className="px-6 py-3">ยี่ห้อ</TableHead>
          <TableHead className="px-6 py-3">รุ่น</TableHead>
          <TableHead className="px-6 py-3">ปี</TableHead>
          <TableHead className="px-6 py-3">สี</TableHead>
          <TableHead className="px-6 py-3">หมายเลขตัวถัง</TableHead>
          <TableHead className="px-6 py-3">หมายเลขเครื่องยนต์</TableHead>
          <TableHead className="px-6 py-3">ประเภทรถ</TableHead>
          <TableHead className="px-6 py-3">สถานะ</TableHead>
          <TableHead className="px-6 py-3">หมายเหตุ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((item) => (
            <TableRow 
              key={item.id} 
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => onRowClick(item)}
            >
              <TableCell className="font-semibold px-6 "><p className="text-blue-600  font-semibold">{item.license_plate}</p></TableCell>
              <TableCell className="px-6 ">{item.province}</TableCell>
              <TableCell className="px-6 ">{item.brand}</TableCell>
              <TableCell className="px-6 ">{item.car_model}</TableCell>
              <TableCell className="px-6 ">{item.year}</TableCell>
              <TableCell className="px-6 ">{item.color}</TableCell>
              <TableCell className="px-6">{item.chassis_number}</TableCell>
              <TableCell className="px-6">{item.engine_number}</TableCell>
              <TableCell className="px-6">{item.fuel_type}</TableCell>
              <TableCell className="px-6"><p className={`text-2xs ${styleStatus[item.status]}`}>{item.status}</p></TableCell>
              <TableCell className="px-6">{item.remark == '' ? '-' : item.remark}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow key="empty">
            <TableCell colSpan={9} className="h-24 text-center text-zinc-500 font-medium">
              ไม่พบข้อมูลรถยนต์
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      
    </Table>
  )
}
