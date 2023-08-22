import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
//import { library } from "@fortawesome/fontawesome-svg-core";
//import { faStar } from "@fortawesome/free-solid-svg-icons";
//library.add(faStar);
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./assets/logo.png";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  //const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(0);
  const frais = Number(2.5);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--n8mxxl6qzz9w.code.run/"
        );
        // console.log(response.data);
        //console.log(response.data.restaurant.name);
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const handleClickCart = (meal) => {
    const newCart = [...cart];
    newCart.push(meal.title, meal.price);
    setCart(newCart);
    setTotal(total + Number(meal.price));
  };

  /*const handleClickCounter = (index, value, meal) => {
    const newCounter = [...counter];
    newCounter.splice(index, 1, value);
    setCounter(newCounter);
    setTotal(total + Number(meal.price));
  };*/

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <header>
        <div className="container">
          <img src={logo} alt="Logo deliveroo" />
        </div>
      </header>
      <main>
        <div className="container">
          <section className="one">
            <div className="section-one">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <div>
              <img src={data.restaurant.picture} alt="" />
            </div>
          </section>
          <div className="section-two">
            <section className="meal">
              {data.categories.map((category) => {
                if (category.meals.length !== 0) {
                  console.log(category);
                  return (
                    <section key={category.name}>
                      <h2>{category.name} </h2>
                      <div className="meal-description">
                        {category.meals.map((meal) => {
                          console.log(meal);
                          return (
                            <article
                              key={meal.id}
                              onClick={() => {
                                handleClickCart(meal);
                                console.log(meal);
                              }}
                            >
                              <div className="meal-details">
                                <h3>{meal.title} </h3>
                                <p>{meal.description} </p>
                                <div>
                                  <p>{meal.price}€ </p>
                                  {meal.popular === true && (
                                    <div>
                                      <span> Populaire</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {meal.picture && (
                                <img src={meal.picture} alt={meal.title} />
                              )}
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  );
                } else {
                  return null;
                }
              })}
            </section>
            <section className="cart">
              <div className="cart-element">
                <button className="validation-cart empty-cart">
                  Valider mon panier
                </button>
                <div className="status-cart">
                  {total === 0 ? (
                    <p>Votre panier est vide</p>
                  ) : (
                    <div>
                      <div>
                        <span> </span>
                      </div>
                      <div>
                        <p>Sous-total {total} € </p>
                        <p>Frais de livraison {Number(2.5)}€</p>
                      </div>
                      <div>Total{total + frais} €</div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
