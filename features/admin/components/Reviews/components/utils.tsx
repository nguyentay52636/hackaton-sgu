import { Star } from "lucide-react"

export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "approved":
      return "bg-green-500/10 text-green-600 border-green-500/20"
    case "rejected":
      return "bg-red-500/10 text-red-600 border-red-500/20"
    case "reported":
      return "bg-orange-500/10 text-orange-600 border-orange-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

export const renderStars = (rating: number) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

