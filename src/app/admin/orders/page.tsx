"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Filter } from "lucide-react";

// Mock Data
type OrderStatus = "결제완료" | "배송준비" | "배송중" | "배송완료" | "취소";

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
}

const MOCK_ORDERS: Order[] = [
  { id: "ORD-001", customer: "김철수", items: "진로적성검사 (개인용) 외 1건", total: 85000, status: "결제완료", date: "2023-12-14", paymentMethod: "카드" },
  { id: "ORD-002", customer: "이영희", items: "진로 가이드북", total: 15000, status: "배송준비", date: "2023-12-13", paymentMethod: "계좌이체" },
  { id: "ORD-003", customer: "박민수", items: "프리미엄 상담권", total: 150000, status: "배송중", date: "2023-12-12", paymentMethod: "카드" },
  { id: "ORD-004", customer: "최지혜", items: "적성검사 (단체)", total: 450000, status: "배송완료", date: "2023-12-10", paymentMethod: "법인카드" },
  { id: "ORD-005", customer: "정우성", items: "진로 코칭 1회", total: 100000, status: "취소", date: "2023-12-09", paymentMethod: "카드" },
];

const statusColors: Record<OrderStatus, string> = {
  "결제완료": "bg-blue-100 text-blue-800",
  "배송준비": "bg-yellow-100 text-yellow-800",
  "배송중": "bg-indigo-100 text-indigo-800",
  "배송완료": "bg-green-100 text-green-800",
  "취소": "bg-red-100 text-red-800",
};

export default function OrderManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.includes(searchQuery) ||
      order.id.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">주문 관리</h1>
        <Button>주문 엑셀 다운로드</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                    placeholder="주문번호, 주문자명 검색..." 
                    className="pl-9 bg-white dark:bg-slate-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-10 border-dashed">
                    <Filter className="w-4 h-4 mr-2" />
                    상태 필터
                </Button>
            </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
              <TableHead className="w-[100px]">주문번호</TableHead>
              <TableHead>주문자</TableHead>
              <TableHead className="w-[300px]">상품정보</TableHead>
              <TableHead>결제금액</TableHead>
              <TableHead>결제수단</TableHead>
              <TableHead>주문일자</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="text-muted-foreground">{order.items}</TableCell>
                <TableCell className="font-bold">{order.total.toLocaleString()}원</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>상태 변경</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, "배송준비")}>
                        배송준비
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, "배송중")}>
                        배송중
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, "배송완료")}>
                        배송완료 (완료처리)
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(order.id, "취소")}>
                        주문 취소
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
