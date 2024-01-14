import { defineStore } from 'pinia';
interface CartState {
    cartItems: CartItem[];
    searchQuery: string;
    cartTotal: number;
    cartTotalPrice: number;
}

interface CartItem {
    id:number;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    quantity: number;
}
export const  useCartStore = defineStore({
    id: 'cart',
    state: (): CartState => ({
        cartItems: [] as CartItem[],
        searchQuery: '' as string,
    }),
    getters: {
        cartTotal: (state) => state.cartItems.reduce((count, item) => count + item.quantity, 0),
        cartTotalPrice: (state) => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    },
    actions: {
        addToCart(item: CartItem) {
            const existingItem = this.cartItems.find((cartItem) => cartItem.name === item.name);
      
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              this.cartItems = [...this.cartItems, { ...item, quantity: 1 }];
            }
      
            // Save the updated cart to local storage
            this.saveToLocalStorage();
          },
        removeFromCart(index: number) {
        this.cartItems.splice(index, 1);
        // Save the updated cart to local storage
        this.saveToLocalStorage();
        },
        incrementQuantity(index: number) {
        this.cartItems[index].quantity += 1;
        // Save the updated cart to local storage
        this.saveToLocalStorage();
        },
        decrementQuantity(index: number) {
        const currentItem = this.cartItems[index];
        if (currentItem.quantity > 1) {
            currentItem.quantity -= 1;
        } else {
            // Remove the item if the quantity becomes 0
            this.cartItems.splice(index, 1);
        }
        // Save the updated cart to local storage
        this.saveToLocalStorage();
        },
        loadFromLocalStorage() {
        const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                this.cartItems = JSON.parse(storedCart).map((item: CartItem) => ({
                ...item,
                quantity: item.quantity || 1,
                }));
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        },
        
    }
})