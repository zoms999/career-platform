"use client";

import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ShieldCheck, AlertOctagon } from "lucide-react";

const LOGS = [
  { id: 1024, user: 'admin@humanx.com', action: 'Login Success', ip: '192.168.1.10', time: '2024-12-15 10:30:22', status: 'Success' },
  { id: 1023, user: 'manager@humanx.com', action: 'Update Product [PROD-002]', ip: '192.168.1.15', time: '2024-12-15 09:15:00', status: 'Success' },
  { id: 1022, user: 'unknown', action: 'Login Failed', ip: '210.123.45.67', time: '2024-12-14 23:12:10', status: 'Failed' },
  { id: 1021, user: 'admin@humanx.com', action: 'Delete Review [REV-88]', ip: '192.168.1.10', time: '2024-12-14 15:40:33', status: 'Success' },
  { id: 1020, user: 'system', action: 'Daily Backup', ip: 'localhost', time: '2024-12-14 00:00:00', status: 'Success' },
];

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div>
         <h1 className="text-2xl font-bold text-slate-900">시스템 로그 및 보안</h1>
         <p className="text-muted-foreground">관리자 작업 이력과 보안 이슈를 모니터링합니다.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-100">
               <TableRow>
                  <TableHead className="w-[100px]">Log ID</TableHead>
                  <TableHead>User / Actor</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="w-[150px]">IP Address</TableHead>
                  <TableHead className="w-[200px]">Timestamp</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {LOGS.map(log => (
                  <TableRow key={log.id}>
                     <TableCell className="font-mono text-xs">{log.id}</TableCell>
                     <TableCell className="font-medium">{log.user}</TableCell>
                     <TableCell>{log.action}</TableCell>
                     <TableCell className="font-mono text-xs text-slate-500">{log.ip}</TableCell>
                     <TableCell className="text-sm text-slate-500">{log.time}</TableCell>
                     <TableCell>
                        <Badge variant={log.status === 'Success' ? 'outline' : 'destructive'}>
                           {log.status === 'Success' ? <ShieldCheck className="w-3 h-3 mr-1" /> : <AlertOctagon className="w-3 h-3 mr-1" />}
                           {log.status}
                        </Badge>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
