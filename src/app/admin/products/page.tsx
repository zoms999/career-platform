"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";

// Mock Data
const PRODUCTS = [
  { id: 'PROD-001', name: 'OCTO 진로적성검사 (개인)', category: '검사권', price: 50000, stock: 9999, status: 'Active' },
  { id: 'PROD-002', name: '진로 컨설팅 (Basic)', category: '컨설팅', price: 150000, stock: 50, status: 'Active' },
  { id: 'PROD-003', name: '꿈을 찾는 카드 (초급)', category: '교구', price: 25000, stock: 120, status: 'Active' },
  { id: 'PROD-004', name: '강사 양성 과정 (온라인)', category: '강의', price: 300000, stock: 9999, status: 'Active' },
  { id: 'PROD-005', name: '진로 보드게임 세트', category: '교구', price: 85000, stock: 0, status: 'Sold Out' },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = PRODUCTS.filter(p => p.name.includes(searchTerm));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">콘텐츠 관리</h1>
           <p className="text-muted-foreground">상품, 강의, 검사권을 통합 관리합니다.</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> 상품 등록</Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
          <Input 
             placeholder="상품명 검색..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-white"
          />
          <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-[120px]">상품 ID</TableHead>
                      <TableHead>상품명</TableHead>
                      <TableHead className="w-[100px]">카테고리</TableHead>
                      <TableHead className="w-[100px] text-right">가격</TableHead>
                      <TableHead className="w-[100px] text-center">재고</TableHead>
                      <TableHead className="w-[100px] text-center">상태</TableHead>
                      <TableHead className="w-[100px] text-right">관리</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {filtered.map((prod) => (
                      <TableRow key={prod.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-slate-500">{prod.id}</TableCell>
                          <TableCell className="font-bold text-slate-900 flex items-center gap-2">
                              <Package className="w-4 h-4 text-slate-400" />
                              {prod.name}
                          </TableCell>
                          <TableCell>{prod.category}</TableCell>
                          <TableCell className="text-right">{prod.price.toLocaleString()}원</TableCell>
                          <TableCell className="text-center">{prod.stock === 9999 ? '∞' : prod.stock}</TableCell>
                          <TableCell className="text-center">
                              <Badge variant={prod.status === 'Active' ? 'default' : 'secondary'} className={prod.status === 'Sold Out' ? 'bg-slate-500' : 'bg-green-600'}>
                                  {prod.status}
                              </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600"><Edit className="w-4 h-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                              </div>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </div>
    </div>
  );
}
