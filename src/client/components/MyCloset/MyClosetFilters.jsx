import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Button} from 'semantic-ui-react';
import DropdownSearchSelection from '../DropdownSearch.jsx';
import { itemColorsExample, itemBrandsExample, itemSeasonsExample, itemCategoriesExample } from "./ExampleData";
import {
  updateItemColors,
  updateItemBrands,
  updateItemCategories,
  updateItemSeasons,
  updateSelectedSeasons,
  updateSelectedColors,
  updateSelectedCategories,
  updateSelectedBrands,
  updateFilteredState
} from '../../actions/myClosetActions';


export class MyClosetFilters extends React.Component {
  constructor(props) {
    super(props);
    this.clearAllDropdowns=this.clearAllDropdowns.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    //MOCK DATA

    this.props.actions.updateItemColors(itemColorsExample);
    this.props.actions.updateItemBrands(itemBrandsExample);
    this.props.actions.updateItemSeasons(itemSeasonsExample);
    this.props.actions.updateItemCategories(itemCategoriesExample);
  }

  updateFilter() {
    this.props.actions.updateFilteredState(isFiltered);
  }

  clearAllDropdowns() {
    this.props.actions.updateSelectedSeasons([]);
    this.props.actions.updateSelectedBrands([]);
    this.props.actions.updateSelectedColors([]);
    this.props.actions.updateSelectedCategories([]);
    this.props.actions.updateFilteredState(false);
  }

  render(){
    const brands = this.props.brands || [];
    const colors = this.props.colors || [];
    const categories = this.props.categories || [];
    const seasons = this.props.seasons || [];
    return (
      <Grid padded>
        <Grid.Row centered>
          <Grid.Column mobile={16} computer={5} tablet={8} widescreen={3} largeScreen={3}>
            <DropdownSearchSelection
              value={this.props.selectedSeasons || []}
              id="seasonFilter"
              options={seasons}
              text='Filter by season'
              onChange={(e, data) => {
                this.props.actions.updateSelectedSeasons(data.value);
                this.props.filterItems();
              }} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={5} tablet={8} widescreen={3} largeScreen={3}>
            <DropdownSearchSelection
              value={this.props.selectedCategories || []}
              id="categoryFilter"
              options={categories}
              text='Filter by category'
              onChange={(e, data) => {
                this.props.actions.updateSelectedCategories(data.value);
                this.props.filterItems();
              }}/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={5} tablet={8} widescreen={3} largeScreen={3}>
            <DropdownSearchSelection
              value={this.props.selectedColors || []}
              id="colorFilter"
              options={colors}
              text='Filter by color'
              onChange={(e, data) => {
                this.props.actions.updateSelectedColors(data.value);
                this.props.filterItems();
              }}/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={5} tablet={8} widescreen={3} largeScreen={3}>
            <DropdownSearchSelection
              value={this.props.selectedBrands || []}
              id="brandFilter"
              options={brands}
              text='Filter by brand'
              onChange={(e, data) => {
                this.props.actions.updateSelectedBrands(data.value);
                this.props.filterItems();
              }}/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={2} tablet={2} widescreen={2} largeScreen={2} >
            <Button basic color='red' onClick={this.clearAllDropdowns}>
              Reset
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  seasons: state.closet.itemSeasons,
  categories: state.closet.itemCategories,
  colors: state.closet.itemColors,
  brands: state.closet.itemBrands,
  selectedSeasons: state.closet.selectedSeasons,
  selectedColors: state.closet.selectedItemColors,
  selectedBrands: state.closet.selectedItemBrands,
  selectedCategories: state.closet.selectedItemCategories
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateItemColors,
    updateItemBrands,
    updateItemCategories,
    updateItemSeasons,
    updateSelectedSeasons,
    updateSelectedColors,
    updateSelectedCategories,
    updateSelectedBrands,
    updateFilteredState
    },
    dispatch)
});

MyClosetFilters.propTypes  = {
    brands: PropTypes.array,
    colors: PropTypes.array,
    categories: PropTypes.array,
    seasons: PropTypes.array,
    filterItems: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyClosetFilters));
