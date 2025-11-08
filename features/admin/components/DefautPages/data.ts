export const restaurants = [
    { id: 1, name: "Phở Hòa Pasteur", owner: "Nguyễn Văn A", cuisine: "Phở", rating: 4.8, reviews: 1234, status: "active", verified: true },
    { id: 2, name: "Bánh Mì Huỳnh Hoa", owner: "Trần Thị B", cuisine: "Bánh Mì", rating: 4.9, reviews: 2341, status: "active", verified: true },
    { id: 3, name: "Cơm Tấm Mộc", owner: "Lê Văn C", cuisine: "Cơm Tấm", rating: 4.7, reviews: 876, status: "pending", verified: false },
    { id: 4, name: "Bún Bò Huế Đông Ba", owner: "Phạm Thị D", cuisine: "Bún", rating: 4.6, reviews: 654, status: "active", verified: true },
]

export const users = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", role: "owner", joinDate: "01/01/2024", status: "active" },
    { id: 2, name: "Trần Thị B", email: "tranthib@email.com", role: "user", joinDate: "15/01/2024", status: "active" },
    { id: 3, name: "Lê Văn C", email: "levanc@email.com", role: "owner", joinDate: "20/02/2024", status: "suspended" },
]

export const pendingReviews = [
    { id: 1, user: "Nguyễn Văn A", restaurant: "Phở Hòa Pasteur", rating: 5, comment: "Phở rất ngon, nước dùng đậm đà!", date: "2 giờ trước" },
    { id: 2, user: "Trần Thị B", restaurant: "Bánh Mì Huỳnh Hoa", rating: 4, comment: "Bánh mì ngon nhưng hơi đắt.", date: "5 giờ trước" },
]