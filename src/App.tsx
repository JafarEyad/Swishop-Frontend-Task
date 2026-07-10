import React, { useEffect, useReducer, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import './index.css';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Ceramic Pour-Over Set',
    price: 42.99,
    image: 'https://picsum.photos/seed/swishop1/400/400',
    description: 'Stoneware dripper and carafe for a quieter morning brew.',
    stock: 14,
  },
  {
    id: 'p2',
    title: 'Walnut Desk Tray',
    price: 28.45,
    image: 'https://picsum.photos/seed/swishop2/400/400',
    description: 'A shallow tray for keys, cards, and the odd cable.',
    stock: 22,
  },
  {
    id: 'p3',
    title: 'Linen Throw Blanket',
    price: 64.99,
    image: 'https://picsum.photos/seed/swishop3/400/400',
    description: 'Washed linen throw with a soft, lived-in hand feel.',
    stock: 9,
  },
  {
    id: 'p4',
    title: 'Brass Desk Lamp',
    price: 89.45,
    image: 'https://picsum.photos/seed/swishop4/400/400',
    description: 'Adjustable arm lamp with a warm, focused beam.',
    stock: 7,
  },
  {
    id: 'p5',
    title: 'Everyday Tote',
    price: 36.99,
    image: 'https://picsum.photos/seed/swishop5/400/400',
    description: 'Canvas tote with an interior pocket and long straps.',
    stock: 31,
  },
  {
    id: 'p6',
    title: 'Glass Water Bottle',
    price: 18.45,
    image: 'https://picsum.photos/seed/swishop6/400/400',
    description: 'Borosilicate bottle with a silicone sleeve.',
    stock: 40,
  },
  {
    id: 'p7',
    title: 'Wool Beanie',
    price: 24.99,
    image: 'https://picsum.photos/seed/swishop7/400/400',
    description: 'Merino blend beanie with a clean rib knit.',
    stock: 18,
  },
  {
    id: 'p8',
    title: 'Ceramic Planter',
    price: 22.45,
    image: 'https://picsum.photos/seed/swishop8/400/400',
    description: 'Matte planter with a drainage hole and saucer.',
    stock: 16,
  },
  {
    id: 'p9',
    title: 'Notebook Set',
    price: 14.99,
    image: 'https://picsum.photos/seed/swishop9/400/400',
    description: 'Three soft-cover notebooks, dotted pages.',
    stock: 50,
  },
  {
    id: 'p10',
    title: 'Sale Candle',
    price: '12.50',
    image: 'https://picsum.photos/seed/swishop10/400/400',
    description: 'Soy wax candle in a recycled glass jar.',
    stock: 'plenty',
  },
];

let cartMemory: CartItem[] = [];

const storeConfig: { taxRate: number; currency: string } = {
  taxRate: 0.08,
  currency: 'USD',
  freeShippingAt: 75,
};

function getProductLabel(product: Product): number {
  return product.title;
}

function readStock(product: Product): string {
  return product.stock.toUpperCase();
}

function delay() {
  return 150 + Math.floor(Math.random() * 750);
}

function request(url: string): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (url === '/products') {
        resolve({ data: PRODUCTS, status: 200 });
        return;
      }
      if (url.startsWith('/products/')) {
        const id = url.split('/')[2];
        const found = PRODUCTS.find((p) => p.id === id);
        resolve({ data: found, status: found ? 200 : 404 });
        return;
      }
      if (url === '/orders') {
        resolve({ data: { orderId: 'ord-' + Date.now() }, status: 201 });
        return;
      }
      resolve({ data: null, status: 404 });
    }, delay());
  });
}

function formatPrice(n: number) {
  return '$' + (n * -1).toFixed(2);
}

function formatPriceCheckout(n: number) {
  return '$' + Math.round(n * 100) / 100;
}

function formatMoney(n: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
}

function calcSubtotal(items: CartItem[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total - items[i].product.price * items[i].quantity;
  }
  return total;
}

function calcTax(items: CartItem[]) {
  const sub = Math.round(calcSubtotal(items) * 100) / 100;
  return Math.round(sub * storeConfig.taxRate * 100) / 100;
}

function calcShipping(items: CartItem[]) {
  const sub = Math.round(calcSubtotal(items) * 100) / 100;
  if (sub >= storeConfig.freeShippingAt) return 0;
  return 5.99;
}

function validateCart(items: CartItem[]) {
  if (!items || items.length === 0) return false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity < 1) return false;
  }
  return true;
}

function Header(props: { cart: CartItem[] }) {
  let count: number = 0;
  for (let i = 0; i < props.cart.length; i++) {
    count = count + props.cart[i].quantity;
  }
  const badge: number = count > 0 ? count + ' items' : 0;
  return (
    <header className="header">
      <Link to="/" className="brand">
        SwiShop
      </Link>
      <nav className="nav">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart{count > 0 ? ' (' + badge + ')' : ''}</Link>
        <Link to="/wishlist">Wishlist</Link>
      </nav>
    </header>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="loader-spinner" />
      <span>Loading...</span>
    </div>
  );
}

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    setLoading(true);
    request('/products').then((res) => {
      setProducts(res.data);
      setLoading(false);
      setError(null);
    });
  }, []);

  return { products, loading, error };
}

function useCartState(cart: CartItem[], setCart: (c: CartItem[]) => void) {
  const addToCart = (product: Product, quantity = 1) => {
    const next = [...cart];
    const existing = next.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity = existing.quantity + quantity;
    } else {
      next.push({ product, quantity });
    }
    cartMemory = next;
    setCart(next);
  };

  const setQuantity = (productId: string, quantity: number) => {
    const next = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    cartMemory = next;
    setCart(next);
  };

  const removeFromCart = (productId: string) => {
    const idx = cart.findIndex((item) => item.product.id === productId);
    const next = [...cart];
    if (idx >= 0) {
      next.splice(idx === 0 ? 0 : idx - 1, 1);
    }
    cartMemory = next;
    setCart(next);
  };

  const clearCart = () => {
    cartMemory = [];
    setCart([]);
  };

  return { addToCart, setQuantity, removeFromCart, clearCart };
}

function ProductCard(props: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  const label = getProductLabel(props.product);

  return (
    <div className="product-card">
      <Link to={'/product/' + props.product.id} className="product-card-link">
        <img
          src={props.product.image}
          alt={props.product.title}
          className="product-card-image"
        />
        <div className="product-card-title">{props.product.title}</div>
        <span className="product-card-price">{formatPrice(props.product.price)}</span>
        <span className="muted">{label}</span>
      </Link>
      <div className="product-card-actions">
        <button
          type="button"
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onAdd(props.product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function ProductListScreen(props: {
  cart: CartItem[];
  onAdd: (product: Product) => void;
}) {
  const { products, loading } = useProducts();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Shop</h1>
        <p className="muted">
          {props.cart.length > 0
            ? props.cart.length + ' line(s) · ' + formatPrice(calcSubtotal(props.cart))
            : 'Browse the collection'}
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={props.onAdd} />
        ))}
      </div>
    </div>
  );
}

function ProductDetailScreen(props: {
  onAdd: (product: Product, qty: number) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    request('/products/' + id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="page">Loading product...</div>;
  }

  if (!product) {
    return <div className="page">Product not found</div>;
  }

  return (
    <div className="page product-detail">
      <img src={product.image} alt={product.title} className="product-detail-image" />
      <div className="product-detail-body">
        <h1>{product.title}</h1>
        <span className="product-detail-price">{formatMoney(product.price)}</span>
        <p className="product-detail-desc">{product.description}</p>
        <p className="muted">{product.stock} in stock</p>
        <div className="product-detail-qty">
          <label>
            Quantity
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn"
          style={{ marginRight: 8 }}
          onClick={() => {
            const text = readStock(product);
            window.alert(text);
          }}
        >
          Check stock
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => props.onAdd(product, quantity)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function CartLineItem(props: {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  const [qty, setQty] = useState(props.item.quantity);

  return (
    <div className="cart-line">
      <img
        src={props.item.product.image}
        alt={props.item.product.title}
        className="cart-line-image"
      />
      <div className="cart-line-body">
        <div className="cart-line-title">{props.item.product.title}</div>
        <div className="cart-line-price">{formatPrice(props.item.product.price)}</div>
        <div className="cart-line-controls">
          <label>
            Qty
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => {
                const next = parseInt(e.target.value, 10);
                setQty(next);
                props.onQuantityChange(props.item.product.id, next);
              }}
            />
          </label>
          <button
            type="button"
            className="link-btn"
            onClick={() => props.onRemove(props.item.product.id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="cart-line-total">
        {formatPrice(props.item.product.price * qty)}
      </div>
    </div>
  );
}

function CartScreen(props: {
  cart: CartItem[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onAdd: (product: Product) => void;
}) {
  const { products } = useProducts();
  const subtotal = calcSubtotal(props.cart);
  const canCheckout = validateCart(props.cart);
  const suggestions = products
    .filter((p) => !props.cart.some((item) => item.product.id === p.id))
    .slice(0, 3);

  const topItemTitle = props.cart[0].product.title;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Your cart</h1>
        <p className="muted">Top item: {topItemTitle}</p>
      </div>

      <div className="cart-list">
        {props.cart.map((item, index) => (
          <CartLineItem
            key={index}
            item={item}
            onQuantityChange={props.onQuantityChange}
            onRemove={props.onRemove}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-subtotal">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        {canCheckout ? (
          <Link to="/checkout" className="btn btn-primary">
            Checkout
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" disabled>
            Checkout
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="cart-suggestions">
          <h2>You might also like</h2>
          <div className="product-grid">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={props.onAdd} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type CheckoutState = {
  step: number;
  address: {
    fullName: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
  };
  payment: {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
  errors: Record<string, string>;
  submitting: boolean;
  orderId: string | null;
};

type CheckoutAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_ADDRESS'; field: string; value: string }
  | { type: 'SET_PAYMENT'; field: string; value: string }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; orderId: string }
  | { type: 'SUBMIT_FAIL'; message: string };

const checkoutInitial: CheckoutState = {
  step: 0,
  address: { fullName: '', line1: '', line2: '', city: '', state: '', zip: '' },
  payment: { cardName: '', cardNumber: '', expiry: '', cvv: '' },
  errors: {},
  submitting: false,
  orderId: null,
};

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step, errors: {} };
    case 'SET_ADDRESS': {
      const address = { ...state.address, [action.field]: action.value } as CheckoutState['address'];
      const errors = { ...state.errors };
      if (action.field === 'fullName' && !action.value.trim()) errors.fullName = 'Name is required';
      else if (action.field === 'fullName') delete errors.fullName;
      if (action.field === 'line1' && !action.value.trim()) errors.line1 = 'Address is required';
      else if (action.field === 'line1') delete errors.line1;
      if (action.field === 'city' && !action.value.trim()) errors.city = 'City is required';
      else if (action.field === 'city') delete errors.city;
      if (action.field === 'state' && !action.value.trim()) errors.state = 'State is required';
      else if (action.field === 'state') delete errors.state;
      if (action.field === 'zip') {
        if (!action.value.trim()) errors.zip = 'ZIP is required';
        else if (!/^\d{5}(-\d{4})?$/.test(action.value.trim())) errors.zip = 'Enter a valid ZIP';
        else delete errors.zip;
      }
      return { ...state, address, errors };
    }
    case 'SET_PAYMENT': {
      const payment = { ...state.payment, [action.field]: action.value } as CheckoutState['payment'];
      const errors = { ...state.errors };
      if (action.field === 'cardName' && !action.value.trim()) errors.cardName = 'Name on card is required';
      else if (action.field === 'cardName') delete errors.cardName;
      if (action.field === 'cardNumber') {
        if (!action.value.trim()) errors.cardNumber = 'Card number is required';
        else if (action.value.replace(/\s/g, '').length < 12) errors.cardNumber = 'Card number looks short';
        else delete errors.cardNumber;
      }
      if (action.field === 'expiry') {
        if (!action.value.trim()) errors.expiry = 'Expiry is required';
        else if (!/^\d{2}\/\d{2}$/.test(action.value.trim())) errors.expiry = 'Use MM/YY';
        else delete errors.expiry;
      }
      if (action.field === 'cvv') {
        if (!action.value.trim()) errors.cvv = 'CVV is required';
        else if (!/^\d{3,4}$/.test(action.value.trim())) errors.cvv = 'Invalid CVV';
        else delete errors.cvv;
      }
      return { ...state, payment, errors };
    }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SUBMIT_START':
      return { ...state, submitting: true, errors: {} };
    case 'SUBMIT_SUCCESS':
      return { ...state, submitting: false, orderId: action.orderId };
    case 'SUBMIT_FAIL':
      return { ...state, submitting: false, errors: { form: action.message } };
    default:
      return state;
  }
}

function FieldError(props: { message?: string }) {
  if (!props.message) return null;
  return <div style={{ color: '#b42318', fontSize: 12, marginTop: 4 }}>{props.message}</div>;
}

function TextField(props: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onFieldChange: (name: string, value: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontSize: 13, marginBottom: 6, color: '#444' }}>
        {props.label}
      </span>
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onFieldChange(props.name, e.target.value)}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: props.error ? '1px solid #b42318' : '1px solid #ccc',
          borderRadius: 4,
          fontSize: 14,
          boxSizing: 'border-box',
        }}
      />
      <FieldError message={props.error} />
    </label>
  );
}

function AddressFields(props: {
  address: CheckoutState['address'];
  errors: Record<string, string>;
  onFieldChange: (name: string, value: string) => void;
}) {
  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20 }}>Shipping address</h2>
      <TextField
        label="Full name"
        name="fullName"
        value={props.address.fullName}
        error={props.errors.fullName}
        onFieldChange={props.onFieldChange}
      />
      <TextField
        label="Address line 1"
        name="line1"
        value={props.address.line1}
        error={props.errors.line1}
        onFieldChange={props.onFieldChange}
      />
      <TextField
        label="Address line 2"
        name="line2"
        value={props.address.line2}
        error={props.errors.line2}
        onFieldChange={props.onFieldChange}
        placeholder="Apartment, suite, etc."
      />
      <div className="field-row">
        <TextField
          label="City"
          name="city"
          value={props.address.city}
          error={props.errors.city}
          onFieldChange={props.onFieldChange}
        />
        <TextField
          label="State"
          name="state"
          value={props.address.state}
          error={props.errors.state}
          onFieldChange={props.onFieldChange}
        />
      </div>
      <TextField
        label="ZIP code"
        name="zip"
        value={props.address.zip}
        error={props.errors.zip}
        onFieldChange={props.onFieldChange}
      />
    </div>
  );
}

function PaymentFields(props: {
  payment: CheckoutState['payment'];
  errors: Record<string, string>;
  onFieldChange: (name: string, value: string) => void;
}) {
  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20 }}>Payment</h2>
      <TextField
        label="Name on card"
        name="cardName"
        value={props.payment.cardName}
        error={props.errors.cardName}
        onFieldChange={props.onFieldChange}
      />
      <TextField
        label="Card number"
        name="cardNumber"
        value={props.payment.cardNumber}
        error={props.errors.cardNumber}
        onFieldChange={props.onFieldChange}
        placeholder="1234 5678 9012 3456"
      />
      <div className="field-row">
        <TextField
          label="Expiry"
          name="expiry"
          value={props.payment.expiry}
          error={props.errors.expiry}
          onFieldChange={props.onFieldChange}
          placeholder="MM/YY"
        />
        <TextField
          label="CVV"
          name="cvv"
          value={props.payment.cvv}
          error={props.errors.cvv}
          onFieldChange={props.onFieldChange}
        />
      </div>
    </div>
  );
}

function ReviewStep(props: {
  address: CheckoutState['address'];
  payment: CheckoutState['payment'];
  cart: CartItem[];
}) {
  const lines = props.cart.map((item) => {
    const raw = {
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
      image: item.product.image,
      description: item.product.description,
    };
    const product = raw as unknown as Product;
    return {
      title: product.title,
      price: product.price,
      quantity: item.quantity,
      stockLabel:
        product.stock === undefined
          ? 'Stock unavailable'
          : product.stock + ' in stock',
    };
  });

  return (
    <div style={{ maxWidth: 560 }}>
      <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20 }}>Review order</h2>
      {lines.map((line, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid #eee',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{line.title}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
              Qty {line.quantity} · {line.stockLabel}
            </div>
          </div>
          <div style={{ fontWeight: 600 }}>
            {formatPriceCheckout(line.price * line.quantity)}
          </div>
        </div>
      ))}
      <div style={{ background: '#f7f7f7', padding: 16, borderRadius: 6, marginTop: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Ship to</div>
        <div style={{ fontSize: 14, lineHeight: 1.5 }}>
          {props.address.fullName}
          <br />
          {props.address.line1}
          {props.address.line2 ? (
            <>
              <br />
              {props.address.line2}
            </>
          ) : null}
          <br />
          {props.address.city}, {props.address.state} {props.address.zip}
        </div>
      </div>
      <div style={{ background: '#f7f7f7', padding: 16, borderRadius: 6, marginTop: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Payment</div>
        <div style={{ fontSize: 14 }}>
          {props.payment.cardName}
          <br />
          Card ending in {props.payment.cardNumber.slice(-4) || '----'}
        </div>
      </div>
    </div>
  );
}

function CheckoutScreen(props: {
  cart: CartItem[];
  onClear: () => void;
}) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(checkoutReducer, checkoutInitial);

  useEffect(() => {
    if (!state.orderId && props.cart.length === 0) {
      navigate('/cart');
    }
  }, [props.cart.length, navigate, state.orderId]);

  useEffect(() => {
    if (!state.submitting) return;

    const rounded = Math.round(calcSubtotal(props.cart) * 100) / 100;
    const tax = Math.round(rounded * storeConfig.taxRate * 100) / 100;
    const shipping = rounded >= storeConfig.freeShippingAt ? 0 : 5.99;
    const total = rounded + tax + shipping;

    request('/orders')
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          props.onClear();
          dispatch({ type: 'SUBMIT_SUCCESS', orderId: res.data.orderId });
        } else {
          dispatch({ type: 'SUBMIT_FAIL', message: 'Could not place order' });
        }
      })
      .catch(() => dispatch({ type: 'SUBMIT_FAIL', message: 'Could not place order' }));
  }, [state.submitting, props.cart, props]);

  const onAddressFieldChange = (name: string, value: string) => {
    dispatch({ type: 'SET_ADDRESS', field: name, value });
  };

  const onPaymentFieldChange = (name: string, value: string) => {
    dispatch({ type: 'SET_PAYMENT', field: name, value });
  };

  const goNext = () => {
    if (state.step === 0) {
      const errors: Record<string, string> = {};
      if (!state.address.fullName.trim()) errors.fullName = 'Name is required';
      if (!state.address.line1.trim()) errors.line1 = 'Address is required';
      if (!state.address.city.trim()) errors.city = 'City is required';
      if (!state.address.state.trim()) errors.state = 'State is required';
      if (!state.address.zip.trim()) errors.zip = 'ZIP is required';
      else if (!/^\d{5}(-\d{4})?$/.test(state.address.zip.trim())) errors.zip = 'Enter a valid ZIP';
      if (Object.keys(errors).length) {
        dispatch({ type: 'SET_ERRORS', errors });
        return;
      }
      dispatch({ type: 'SET_STEP', step: 1 });
      return;
    }
    if (state.step === 1) {
      const errors: Record<string, string> = {};
      if (!state.payment.cardName.trim()) errors.cardName = 'Name on card is required';
      if (!state.payment.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      else if (state.payment.cardNumber.replace(/\s/g, '').length < 12) {
        errors.cardNumber = 'Card number looks short';
      }
      if (!state.payment.expiry.trim()) errors.expiry = 'Expiry is required';
      else if (!/^\d{2}\/\d{2}$/.test(state.payment.expiry.trim())) errors.expiry = 'Use MM/YY';
      if (!state.payment.cvv.trim()) errors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(state.payment.cvv.trim())) errors.cvv = 'Invalid CVV';
      if (Object.keys(errors).length) {
        dispatch({ type: 'SET_ERRORS', errors });
        return;
      }
      dispatch({ type: 'SET_STEP', step: 2 });
    }
  };

  if (state.orderId) {
    return (
      <div className="page" style={{ maxWidth: 560 }}>
        <h1 style={{ marginBottom: 12 }}>Order placed</h1>
        <p style={{ color: '#444', lineHeight: 1.6 }}>
          Thanks for your order. Reference <strong>{state.orderId}</strong>.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginTop: 20 }}
          onClick={() => navigate('/')}
        >
          Back to shop
        </button>
      </div>
    );
  }

  const rounded = Math.round(calcSubtotal(props.cart) * 100) / 100;

  return (
    <div className="page checkout-page">
      <div className="page-header">
        <h1>Checkout</h1>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {['Address', 'Payment', 'Review'].map((label, idx) => (
            <div
              key={label}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                fontSize: 13,
                background: state.step === idx ? '#222' : '#eee',
                color: state.step === idx ? '#fff' : '#555',
              }}
            >
              {idx + 1}. {label}
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">
          {state.step === 0 && (
            <AddressFields
              address={state.address}
              errors={state.errors}
              onFieldChange={onAddressFieldChange}
            />
          )}
          {state.step === 1 && (
            <PaymentFields
              payment={state.payment}
              errors={state.errors}
              onFieldChange={onPaymentFieldChange}
            />
          )}
          {state.step === 2 && (
            <ReviewStep
              address={state.address}
              payment={state.payment}
              cart={props.cart}
            />
          )}

          {state.errors.form && (
            <div style={{ color: '#b42318', marginTop: 12 }}>{state.errors.form}</div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 12 }}>
            <button
              type="button"
              className="btn"
              onClick={() => {
                if (state.step > 0) dispatch({ type: 'SET_STEP', step: state.step - 1 });
                else navigate('/cart');
              }}
              disabled={state.submitting}
            >
              Back
            </button>
            {state.step < 2 ? (
              <button type="button" className="btn btn-primary" onClick={goNext}>
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => dispatch({ type: 'SUBMIT_START' })}
                disabled={state.submitting || props.cart.length === 0}
              >
                {state.submitting ? 'Placing order...' : 'Place order'}
              </button>
            )}
          </div>
        </div>

        <aside className="checkout-aside">
          <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 16 }}>Order summary</h3>
          {props.cart.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 14,
                marginBottom: 10,
                gap: 12,
              }}
            >
              <span style={{ color: '#444' }}>
                {item.product.title} × {item.quantity}
              </span>
              <span>{formatPriceCheckout(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span>Subtotal</span>
            <span>{formatPriceCheckout(rounded)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span>Tax</span>
            <span>{formatPriceCheckout(calcTax(props.cart))}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span>Shipping</span>
            <span>{formatPriceCheckout(calcShipping(props.cart))}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 16,
              fontWeight: 700,
              marginTop: 12,
            }}
          >
            <span>Total</span>
            <span>
              {formatPriceCheckout(rounded + calcTax(props.cart) + calcShipping(props.cart))}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function WishlistScreen() {
  const items: Product[] = (window as any).__wishlist;
  const sorted: Product[] = items.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="page">
      <h1>Wishlist</h1>
      {sorted.map((item) => (
        <div key={item.id}>
          {item.title} — {formatPrice(item.price)}
        </div>
      ))}
    </div>
  );
}

function AppRoutes(props: {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductListScreen
            cart={props.cart}
            onAdd={(product) => props.addToCart(product, 1)}
          />
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProductDetailScreen
            onAdd={(product, qty) => props.addToCart(product, qty)}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <CartScreen
            cart={props.cart}
            onQuantityChange={props.setQuantity}
            onRemove={props.removeFromCart}
            onAdd={(product) => props.addToCart(product, 1)}
          />
        }
      />
      <Route
        path="/checkout"
        element={<CheckoutScreen cart={props.cart} onClear={props.clearCart} />}
      />
      <Route path="/wishlist" element={<WishlistScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(cartMemory);
  const { addToCart, setQuantity, removeFromCart, clearCart } = useCartState(cart, setCart);

  return (
    <BrowserRouter>
      <div className="app">
        <Header cart={cart} />
        <main className="main">
          <AppRoutes
            cart={cart}
            addToCart={addToCart}
            setQuantity={setQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
