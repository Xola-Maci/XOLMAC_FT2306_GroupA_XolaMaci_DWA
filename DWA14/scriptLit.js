//import { html, css, LitElement } from "lit";

class TallyCount extends LitElement {
  static style = css`
    .counter-container {
      display: flex;
      align-items: center;
    }

    .count {
      margin: 0 10px;
    }

    .min-reached {
      color: red;
    }

    .max-reached {
      color: green;
    }
  `;

  static properties = {
    count: { type: Number },
    state: { type: String },
    min: { type: Number },
    max: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
    this.state = "Normal";
    this.min = -5;
    this.max = 10;
  }

  subtract() {
    if (this.count > this.min) {
      this.count--;
      if (this.count === this.min) {
        this.state = "Minimum Reached";
      } else {
        this.state = "Normal";
      }
    }
  }

  adding() {
    if (this.count < this.max) {
      this.count++;
      if (this.count === this.max) {
        this.state = "Maximum Reached";
      } else {
        this.state = "Normal";
      }
    }
  }

  render() {
    return html` <div class="counter-container">
    <button @click="${this.subtract}">-</button>
    <span class="count ${this.state === 'Minimum Reached' ? 'min-reached' : ''} ${this.state === 'Maximum Reached' ? 'max-reached' : ''}">
      ${this.count}
    </span>
    <button @click="${this.adding}">+</button>
  </div> `;
  }
}
customElements.define('tally-counter', TallyCount);