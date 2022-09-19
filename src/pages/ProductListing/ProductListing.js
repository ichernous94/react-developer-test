import { Component } from 'react';
import { connect } from 'react-redux';

import { getCategoryProducts } from '../../services/graphql/requests';

import './ProductListing.css';

// Helpers
import { withRouter } from '../../services/helpers/withRouter';
import { getAmount } from '../../services/helpers/generalHelper';

// Components
import ProductCard from '../../components/ProductCard';

const mapStateToProps = ({ currency }) => ({
  currency
});

export class Products extends Component {
  constructor(props) {
    super(props);
    const { params, firstCategory } = props;
    this.state = {
      selectedCategory: params.category || firstCategory,
      products: []
    };
  }

  async componentDidMount() {
    const selectedCategory = this.state.selectedCategory;
    if (selectedCategory) await this.fetchAndSetProducts(selectedCategory);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.category !== this.props.params.category)
      this.fetchAndSetProducts(this.props.params.category);
  }

  fetchAndSetProducts = async (selectedCategory) => {
    const results = await getCategoryProducts(selectedCategory).catch(
      (error) => console.log({ error })
    );
    const {
      data: {
        category: { products }
      }
    } = results;

    this.setState((state) => ({
      ...state,
      products,
      selectedCategory
    }));
  };

  navigateToProductDetails = (productID) => {
    this.props.navigate(`/product/${productID}`);
  };

  render() {
    const { selectedCategory, products } = this.state;
    const { currency } = this.props;

    const productCards = products.map(
      ({ name, gallery, prices, id, inStock }, index) => (
        <div key={`${index}-${id}-${currency}`}>
          <ProductCard
            image={gallery[0]}
            name={name}
            currency={currency}
            price={getAmount(prices, currency)}
            inStock={inStock}
            goToProduct={() => this.navigateToProductDetails(id)}
          />
        </div>
      )
    );
    return (
      <div className="products-page">
        <h2>
          {selectedCategory[0].toUpperCase() +
            selectedCategory.slice(1).toLowerCase()}
        </h2>
        <div className="products-container">{productCards}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Products));
