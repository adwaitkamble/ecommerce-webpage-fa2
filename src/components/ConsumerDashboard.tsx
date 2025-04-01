
import { BackendConnectionInfo } from "./BackendConnectionInfo";

export function ConsumerDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Consumer Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Welcome, Consumer</span>
        </div>
      </header>
      
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Account</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold">My Orders</h3>
            <p className="text-3xl font-bold mt-2">5</p>
            <p className="text-sm text-muted-foreground mt-2">3 orders pending</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold">Cart Items</h3>
            <p className="text-3xl font-bold mt-2">2</p>
            <p className="text-sm text-muted-foreground mt-2">Items in your cart</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold">Wishlist</h3>
            <p className="text-3xl font-bold mt-2">8</p>
            <p className="text-sm text-muted-foreground mt-2">Saved items</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold">Account Type</h3>
            <p className="text-3xl font-bold mt-2">Standard</p>
            <p className="text-sm text-muted-foreground mt-2">Customer since 2023</p>
          </div>
        </div>
        
        <div className="mt-8">
          <BackendConnectionInfo />
        </div>
      </main>
    </div>
  );
}

export default ConsumerDashboard;
