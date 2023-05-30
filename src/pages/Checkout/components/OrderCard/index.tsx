import { useContext } from "react";
import { OrderContext } from "../../../../contexts/OrderContext";
import { NavLink } from "react-router-dom";
import { Order } from "./Order";
import { OrderCardContainer, OrderCardTotal } from "./styles";
import { v4 as uuidv4 } from "uuid";

export function OrderCard() {
  const { cart, setCart } = useContext(OrderContext);

  const deliveryValue = 3.5;

  function getTotalValue(itens?: string) {
    let totalItemsValue = 0;
    cart.map((item) => {
      totalItemsValue += item.price * item.qtty!;
    });
    if (itens) {
      return totalItemsValue.toLocaleString("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      });
    } else {
      return (totalItemsValue + 3.5).toLocaleString("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      });
    }
  }

  function removeOrder(name: string | undefined) {
    const cartWitOrderRemoved = cart.filter((item) => item.name != name);
    setCart(cartWitOrderRemoved);
  }

  return (
    <OrderCardContainer>
      {cart.map((order) => {
        const id = uuidv4();
        return (
          <Order
            key={id}
            img={order.img}
            name={order.name}
            price={order.price}
            qtty={order.qtty}
            onRemoveOrder={removeOrder}
          />
        );
      })}
      <OrderCardTotal>
        <p>
          Total dos itens <span>R$ {getTotalValue("itens")}</span>
        </p>
        <p>
          Entrega{" "}
          <span>
            R${" "}
            {cart.length > 0
              ? deliveryValue.toLocaleString("pt-BR", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                })
              : "0,00"}
          </span>
        </p>
        <p>
          <strong>Total</strong>
          <strong>R$ {cart.length > 0 ? getTotalValue() : "0,00"}</strong>
        </p>
      </OrderCardTotal>
      <NavLink className="link" to={"/success"}>
        <button type="submit">Confirmar pedido</button>
      </NavLink>
    </OrderCardContainer>
  );
}