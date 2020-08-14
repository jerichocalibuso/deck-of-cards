import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

import "./Deck.css";

export default class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckId: "",
      drawnCards: [],
      remaining: 0,
    };

    this.drawCard = this.drawCard.bind(this);
  }

  async componentDidMount() {
    // Get deck id
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle"
    );

    // Set deck id and remaining cards
    this.setState({
      deckId: response.data.deck_id,
      remaining: response.data.remaining,
    });
  }

  async drawCard() {
    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
      );
      const newCard = response.data.cards[0];

      if (!response.data.success) {
        throw new Error("No card remaining!");
      }

      this.setState({
        drawnCards: [...this.state.drawnCards, newCard],
        remaining: this.state.remaining - 1,
      });
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawnCards.map((card) => (
      <Card imageSrc={card.image} code={card.code} key={card.code} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">Card Dealer</h1>
        <h2 className="Deck-title subtitle">A little demo made with React</h2>
        <button className="Deck-btn" onClick={this.drawCard}>
          DRAW CARD
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}
