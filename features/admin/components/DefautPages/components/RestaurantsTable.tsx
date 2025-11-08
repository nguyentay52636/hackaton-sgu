import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Button } from "@/shared/ui/button"
import { MoreVertical, Eye, Edit, Trash2, CheckCircle, Star } from "lucide-react"

export default function RestaurantsTable({ restaurants, getStatusBadge }: { restaurants: { id: number, name: string, owner: string, cuisine: string, rating: number, reviews: number, status: string, verified: boolean }[], getStatusBadge: (status: string) => React.ReactNode }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tên nhà hàng</TableHead>
                    <TableHead>Chủ sở hữu</TableHead>
                    <TableHead>Ẩm thực</TableHead>
                    <TableHead>Đánh giá</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{restaurant.name}</span>
                                {restaurant.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                            </div>
                        </TableCell>
                        <TableCell>{restaurant.owner}</TableCell>
                        <TableCell>{restaurant.cuisine}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span>{restaurant.rating}</span>
                                <span className="text-muted-foreground text-sm">({restaurant.reviews})</span>
                            </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(restaurant.status)}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />Xem chi tiết</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Edit className="h-4 w-4 mr-2" />Sửa</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="h-4 w-4 mr-2" />Xóa
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
