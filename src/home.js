import React from "react"

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: props.products || null
    }
  }
  componentDidMount() {
    const products = window.PRODUCT_STATE || null
    this.setState({
      products
    })

    if (!products) {
      fetch("https://itunes.apple.com/in/rss/topalbums/limit=100/json")
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            products: data.feed.entry
          })
        })
        .catch((err) => {
          console.log("Error in fetching products", err)
        })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>Home</div>
        {
          this.state.products !== null &&
          this.state.products.map((item) => {
            return <img src={item["im:image"][2].label} />
          })
        }
      </React.Fragment>
    )
  }
}

export default Home