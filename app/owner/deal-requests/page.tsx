import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function DealRequestsPage() {
  const hotelId = "demo-hotel-123";
  const redemptions = await prisma.dealRedemption.findMany({
    where: { hotelId, status: "pending" },
    include: { deal: true },
    orderBy: { createdAt: "desc" }
  });

  async function fulfill(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    await prisma.dealRedemption.update({
      where: { id },
      data: { status: "fulfilled", fulfilledAt: new Date() }
    })
    revalidatePath("/owner/deal-requests")
  }

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: 24 }}>
        Deal Purchase Requests
      </h2>
      
      {redemptions.length === 0 ? (
        <div style={{ 
          padding: 48, 
          textAlign: "center", 
          background: "#f9fafb", 
          borderRadius: 8,
          color: "#6b7280"
        }}>
          <p>No active deal requests at the moment.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {redemptions.map(req => (
            <div 
              key={req.id} 
              style={{ 
                border: "1px solid #e5e7eb", 
                padding: 16, 
                borderRadius: 8,
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: 8 }}>
                  🏨 Room {req.roomNumber} – {req.deal.title}
                </div>
                <div style={{ color: "#059669", fontSize: "1.25rem", fontWeight: "bold" }}>
                  ₹{req.deal.price}
                </div>
                <div style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: 8 }}>
                  Requested by: <strong>{req.guestName || "Unknown"}</strong>
                </div>
                <div style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                  At: {new Date(req.createdAt).toLocaleString("en-IN")}
                </div>
              </div>
              
              <form action={fulfill}>
                <input type="hidden" name="id" value={req.id} />
                <button 
                  type="submit"
                  style={{
                    background: "#7c3aed",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500
                  }}
                >
                  ✓ Mark Fulfilled
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
