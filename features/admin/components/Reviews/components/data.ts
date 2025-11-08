export   interface Review {
    id: string
    userId: string
    userName: string
    userAvatar: string
    restaurantId: string
    restaurantName: string
    rating: number
    comment: string
    images: string[]
    status: "pending" | "approved" | "rejected" | "reported"
    reportReason?: string
    createdAt: string
    moderationNote?: string
}
 export const reviews: Review[] = [
    {
        id: "1",
        userId: "u1",
        userName: "Nguyễn Văn A",
        userAvatar: "/diverse-user-avatars.png",
        restaurantId: "r1",
        restaurantName: "Phở Hà Nội",
        rating: 5,
        comment: "Phở rất ngon, nước dùng đậm đà, thịt bò mềm. Nhân viên phục vụ nhiệt tình. Sẽ quay lại!",
        images: ["/pho-bowl.jpg", "/pho-bo-close-up.jpg"],
        status: "pending",
        createdAt: "2024-01-15T10:30:00",
    },
    {
        id: "2",
        userId: "u2",
        userName: "Trần Thị B",
        userAvatar: "/diverse-user-avatars.png",
        restaurantId: "r2",
        restaurantName: "Bánh Mì Sài Gòn",
        rating: 4,
        comment: "Bánh mì giòn, nhân đầy đủ. Giá cả hợp lý. Chỉ có điều hơi đông người vào giờ cao điểm.",
        images: ["/banh-mi-sandwich.jpg"],
        status: "approved",
        createdAt: "2024-01-14T15:20:00",
    },
    {
        id: "3",
        userId: "u3",
        userName: "Lê Văn C",
        userAvatar: "/diverse-user-avatars.png",
        restaurantId: "r3",
        restaurantName: "Cơm Tấm Sườn",
        rating: 2,
        comment: "Không ngon như kỳ vọng. Sườn khô, cơm nguội.",
        images: [],
        status: "reported",
        reportReason: "Spam",
        createdAt: "2024-01-13T12:00:00",
    },
    {
        id: "4",
        userId: "u4",
        userName: "Phạm Thị D",
        userAvatar: "/diverse-user-avatars.png",
        restaurantId: "r4",
        restaurantName: "Bún Bò Huế",
        rating: 5,
        comment: "Bún bò Huế chuẩn vị, cay nồng đúng điệu. Quán sạch sẽ, thoáng mát.",
        images: ["/bun-bo-hue.png"],
        status: "approved",
        createdAt: "2024-01-12T09:15:00",
    },
    {
        id: "5",
        userId: "u5",
        userName: "Hoàng Văn E",
        userAvatar: "/diverse-user-avatars.png",
        restaurantId: "r1",
        restaurantName: "Phở Hà Nội",
        rating: 1,
        comment: "Tệ, không bao giờ quay lại nữa!",
        images: [],
        status: "rejected",
        moderationNote: "Đánh giá không mang tính xây dựng",
        createdAt: "2024-01-11T14:30:00",
    },
]
