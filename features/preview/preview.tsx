"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { ChefHat, MapPin } from "lucide-react"
import { ARViewer, DishDetailsCard, DishGrid, HeaderSection, RestaurantDetailsCard, RestaurantList } from "."

export default function preview() {
    const [selectedItem, setSelectedItem] = useState<"dish" | "restaurant">("dish")
    const [rotation, setRotation] = useState([0])
    const [zoom, setZoom] = useState([100])
    const [isFullscreen, setIsFullscreen] = useState(false)

    const dishes = [
        {
            id: 1,
            name: "Phở Bò",
            restaurant: "Phở Hòa Pasteur",
            image: "/img/pho-bowl.jpg",
            model: "/models/pho.glb",
            description: "Món phở bò truyền thống với nước dùng trong, thịt bò mềm",
            price: "65.000đ",
            rating: 4.8,
        },
        {
            id: 2,
            name: "Bánh Mì",
            restaurant: "Bánh Mì Huỳnh Hoa",
            image: "/img/banh-mi-sandwich.jpg",
            model: "/models/banh-mi.glb",
            description: "Bánh mì thịt nguội đặc biệt với rau sống và pate",
            price: "25.000đ",
            rating: 4.7,
        },
        {
            id: 3,
            name: "Cơm Tấm",
            restaurant: "Cơm Tấm Mộc",
            image: "/img/com-tam-rice.jpg",
            model: "/models/com-tam.glb",
            description: "Cơm tấm sườn bì chả với nước mắm đặc biệt",
            price: "45.000đ",
            rating: 4.6,
        },
    ]

    const restaurants = [
        {
            id: 1,
            name: "Phở Hòa Pasteur",
            address: "260C Pasteur, Q.3",
            image: "/img/restaurant-1.jpg",
            model: "/models/restaurant-1.glb",
            description: "Quán phở nổi tiếng với hơn 30 năm kinh nghiệm",
            rating: 4.8,
        },
        {
            id: 2,
            name: "Bánh Mì Huỳnh Hoa",
            address: "26 Lê Thị Riêng, Q.1",
            image: "/img/restaurant-2.jpg",
            model: "/models/restaurant-2.glb",
            description: "Tiệm bánh mì nổi tiếng nhất Sài Gòn",
            rating: 4.9,
        },
    ]

    const currentDish = dishes[0]
    const currentRestaurant = restaurants[0]

    return (

        <div className="space-y-8 mx-10">
            <HeaderSection />
            <Tabs value={selectedItem} onValueChange={(v) => setSelectedItem(v as "dish" | "restaurant")}>
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
                    <TabsTrigger value="dish" className="text-base">
                        <ChefHat className="h-4 w-4 mr-2" />
                        Món ăn
                    </TabsTrigger>
                    <TabsTrigger value="restaurant" className="text-base">
                        <MapPin className="h-4 w-4 mr-2" />
                        Nhà hàng
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dish" className="mt-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <ARViewer
                            title="Xem trước 3D"
                            description="Tương tác với mô hình 3D của món ăn"
                            imageSrc={currentDish.image}
                            isFullscreen={isFullscreen}
                            rotation={rotation}
                            zoom={zoom}
                            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                            onRotate={(v) => setRotation([v])}
                            onZoomIn={() => setZoom([Math.min(200, zoom[0] + 20)])}
                            onZoomOut={() => setZoom([Math.max(50, zoom[0] - 20)])}
                            onChangeRotation={setRotation}
                            onChangeZoom={setZoom}
                            alertText={"Sử dụng các điều khiển để xoay và phóng to mô hình 3D. Trên thiết bị di động, bạn có thể sử dụng cử chỉ chạm để tương tác."}
                        />

                        <div className="space-y-6">
                            <DishDetailsCard
                                name={currentDish.name}
                                restaurant={currentDish.restaurant}
                                description={currentDish.description}
                                price={currentDish.price}
                                rating={currentDish.rating}
                            />

                            <DishGrid dishes={dishes.slice(1)} />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="restaurant" className="mt-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <ARViewer
                            title="Xem trước 3D"
                            description="Tương tác với mô hình 3D của nhà hàng"
                            imageSrc={currentRestaurant.image}
                            isFullscreen={isFullscreen}
                            rotation={rotation}
                            zoom={zoom}
                            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                            onRotate={(v) => setRotation([v])}
                            onZoomIn={() => setZoom([Math.min(200, zoom[0] + 20)])}
                            onZoomOut={() => setZoom([Math.max(50, zoom[0] - 20)])}
                            onChangeRotation={setRotation}
                            onChangeZoom={setZoom}
                            alertText={"Khám phá không gian nhà hàng trong 3D. Sử dụng các điều khiển để xem từ nhiều góc độ khác nhau."}
                        />

                        <div className="space-y-6">
                            <RestaurantDetailsCard
                                name={currentRestaurant.name}
                                address={currentRestaurant.address}
                                description={currentRestaurant.description}
                                rating={currentRestaurant.rating}
                            />

                            <RestaurantList restaurants={restaurants.slice(1)} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>


    )
}
