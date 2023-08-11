/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [histories, setHistories] = useState([]);
  const [userHistory, setUserHistory] = useState([]);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:2000/ticket_type");
      setTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch histories
  const fetchHistories = async () => {
    try {
      const res = await axios.get("http://localhost:2000/payment_history");
      setHistories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Purchase handler
  const purchaseHandler = async (id) => {
    try {
      await axios.post(`http://localhost:2000/payment_history`, {
        userId: 1,
        ticketType: id,
        ticketAmount: 1,
      });
      fetchHistories();
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch user's ticket history
  const fetchUserTicketHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/payment_history`, {
        params: {
          userId: 2,
        },
      });
      setUserHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchHistories();
    fetchUserTicketHistory();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        height: "100vh",
      }}
    >
      <p>Total history :</p>
      {histories.length > 0 &&
        histories.map((history) => {
          return (
            <div key={history.id} style={{ display: "flex" }}>
              <p>Ticket type: {history.ticketType}</p>
              <p>Ticket amount: {history.ticketAmount}</p>
            </div>
          );
        })}

      {tickets.length > 0 &&
        tickets.map((ticket, idx) => {
          return (
            <a
              key={idx}
              style={{
                border: "1px solid black",
                width: "fit-content",
                padding: 10,
                borderRadius: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                purchaseHandler(ticket.id);
              }}
            >
              {ticket.title}
            </a>
          );
        })}
    </div>
  );
};

export default HomePage;
