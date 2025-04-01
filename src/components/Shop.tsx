
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "./ThemeToggle";

const products = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 1299.99,
    image: "/placeholder.svg",
    description: "High-performance laptop for professionals",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg",
    description: "Noise-cancelling with premium sound quality",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Fitness Smartwatch",
    price: 149.99,
    image: "/placeholder.svg",
    description: "Track your health and fitness goals",
    category: "Wearables"
  },
  {
    id: 4,
    name: "Gaming Console",
    price: 499.99,
    image: "/placeholder.svg",
    description: "Next-generation gaming experience",
    category: "Gaming"
  },
  {
    id: 5,
    name: "Smartphone",
    price: 899.99,
    image: "/placeholder.svg",
    description: "Latest model with advanced camera",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Tablet",
    price: 349.99,
    image: "/placeholder.svg",
    description: "Portable and powerful for work and play",
    category: "Electronics"
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 79.99,
    image: "/placeholder.svg",
    description: "Barista-quality coffee at home",
    category: "Home"
  },
  {
    id: 8,
    name: "Smart Speaker",
    price: 129.99,
    image: "/placeholder.svg",
    description: "Voice-controlled assistant",
    category: "Electronics"
  }
];

export function Shop() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      // If no user is logged in, redirect to login
      navigate('/');
    }
  }, [navigate]);

  const handleAddToCart = (productId: number, productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (productId: number, productName: string) => {
    toast({
      title: "Added to Wishlist",
      description: `${productName} has been added to your wishlist.`,
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between h-16 px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary" onClick={() => navigate('/shop')} style={{cursor: 'pointer'}}>
              EShop
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/shop" className="text-sm font-medium hover:text-primary">Home</a>
              <a href="#products" className="text-sm font-medium hover:text-primary">Products</a>
              <a href="#categories" className="text-sm font-medium hover:text-primary">Categories</a>
              <a href="#deals" className="text-sm font-medium hover:text-primary">Deals</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="icon" variant="ghost" onClick={() => navigate('/consumer-dashboard')}>
              <UserCircle className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 bg-primary text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                2
              </span>
            </Button>
            <ThemeToggle />
            {user && (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-sm">
                  {user.firstName}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to EShop</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">Discover amazing products at great prices.</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-primary hover:bg-primary/90">Shop Now</Button>
              <Button variant="outline">View Deals</Button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <div className="block md:hidden">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[150px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                  <p className="font-bold text-lg mt-2">${product.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button 
                    onClick={() => handleAddToCart(product.id, product.name)}
                    className="w-3/4"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={() => handleAddToWishlist(product.id, product.name)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t mt-12 py-6 px-4 bg-muted/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">EShop</h3>
              <p className="text-sm text-muted-foreground">
                Your one-stop shop for all things tech and home.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <p className="text-sm text-muted-foreground">
                Email: support@eshop.com<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EShop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Shop;
