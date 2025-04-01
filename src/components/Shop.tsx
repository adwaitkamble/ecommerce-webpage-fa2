
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, Heart, Package, 
  Search, LayoutGrid, Filter, Menu
} from "lucide-react";
import { UserCircle } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addToCart } from "@/services/api";

// Mock products data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Headphones",
    category: "Electronics",
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Watch",
    category: "Electronics",
    inStock: true
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Speaker",
    category: "Electronics",
    inStock: true
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 49.99,
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Backpack",
    category: "Accessories",
    inStock: true
  },
  {
    id: 5,
    name: "Coffee Mug",
    price: 12.99,
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Mug",
    category: "Home",
    inStock: true
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: 79.99,
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Tracker",
    category: "Electronics",
    inStock: false
  }
];

export function Shop() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{id: string, firstName: string, lastName: string, type: string} | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
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
  
  const handleAddToCart = async (productId: number) => {
    try {
      const response = await addToCart(productId, 1);
      toast.success("Product added to cart");
      setCartCount(prev => prev + 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add product to cart");
    }
  };
  
  const handleBuyNow = (productId: number) => {
    handleAddToCart(productId);
    // Navigate to checkout or update UI
    toast.success("Proceeding to checkout...");
  };
  
  const goToCart = () => {
    navigate('/consumer-dashboard');
    toast.info("Redirecting to cart...");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">E-Shop</h1>
        </div>
        <div className="hidden md:flex items-center gap-4 bg-muted/50 rounded-full px-4 py-1.5 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input className="border-0 bg-transparent shadow-none focus-visible:ring-0" placeholder="Search products..." />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">0</span>
          </Button>
          <Button variant="outline" size="icon" className="relative" onClick={goToCart}>
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">{cartCount}</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigate('/consumer-dashboard')}>
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {showMobileMenu && (
        <div className="md:hidden px-4 py-2 border-b">
          <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input className="border-0 bg-transparent shadow-none focus-visible:ring-0" placeholder="Search products..." />
          </div>
        </div>
      )}
      
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Button variant="outline" size="sm">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Grid View
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative bg-muted overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Badge variant="outline" className="text-destructive border-destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                <p className="text-xl font-bold mt-1">${product.price.toFixed(2)}</p>
              </CardContent>
              <Separator />
              <CardFooter className="p-4 grid grid-cols-2 gap-2">
                <Button 
                  variant="outline"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="default"
                  disabled={!product.inStock}
                  onClick={() => handleBuyNow(product.id)}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Shop;
