
import { useState, useEffect } from "react";
import { BackendConnectionInfo } from "./BackendConnectionInfo";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Package, UserCircle } from "lucide-react";

export function ConsumerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{id: string, firstName: string, lastName: string, type: string} | null>(null);
  
  useEffect(() => {
    // Get user information from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.type === 'consumer') {
          setUser(parsedUser);
        } else {
          // If not a consumer, redirect to login
          navigate('/');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/');
      }
    } else {
      // If no user data, redirect to login
      navigate('/');
    }
  }, [navigate]);
  
  const handleShopNow = () => {
    navigate('/shop');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Consumer Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {user && (
            <span className="text-sm text-muted-foreground">
              Welcome, {user.firstName} {user.lastName}
            </span>
          )}
        </div>
      </header>
      
      <main className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Account</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">My Orders</h3>
            </div>
            <p className="text-3xl font-bold mt-2">5</p>
            <p className="text-sm text-muted-foreground mt-2">3 orders pending</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Cart Items</h3>
            </div>
            <p className="text-3xl font-bold mt-2">2</p>
            <p className="text-sm text-muted-foreground mt-2">Items in your cart</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Wishlist</h3>
            </div>
            <p className="text-3xl font-bold mt-2">8</p>
            <p className="text-sm text-muted-foreground mt-2">Saved items</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Account Type</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{user?.type || 'Standard'}</p>
            <p className="text-sm text-muted-foreground mt-2">Customer since 2023</p>
          </div>
        </div>
        
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">Ready to Shop?</h3>
                <p className="text-muted-foreground mt-2">Browse our latest products and offers</p>
              </div>
              <Button onClick={handleShopNow} className="bg-primary hover:bg-primary/90">
                Shop Now
              </Button>
            </div>
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
