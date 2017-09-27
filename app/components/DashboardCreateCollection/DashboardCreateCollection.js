import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import InputField from 'components/InputField/InputField';

require('./dashboardCreateCollection.scss');

const propTypes = {
	isPage: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
	error: PropTypes.string,
	onCreate: PropTypes.func,
};
const defaultProps = {
	isLoading: false,
	error: undefined,
	onCreate: ()=>{},
};

class DashboardCreateCollection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			slug: '',
			description: '',
		};
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleSlugChange = this.handleSlugChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
	}

	handleTitleChange(evt) {
		this.setState({ title: evt.target.value });
	}
	handleSlugChange(evt) {
		this.setState({
			slug: evt.target.value.replace(/[^\w\s-]/gi, '').replace(/ /g, '-').toLowerCase()
		});
	}
	handleDescriptionChange(evt) {
		this.setState({
			description: evt.target.value.substring(0, 280).replace(/\n/g, ' ')
		});
	}
	handleCreateSubmit(evt) {
		evt.preventDefault();
		this.props.onCreate({
			title: this.state.title,
			slug: this.state.slug,
			description: this.state.description,
			isPage: this.props.isPage,
		});
	}

	render() {
		return (
			<div className={'dashboard-create-collection'}>
				<h1 className={'content-title'}>Create New {this.props.isPage ? 'Page' : 'Collection'}</h1>

				<form onSubmit={this.handleCreateSubmit}>
					<InputField
						label={'Collection Title'}
						placeholder={'Brand New Collection'}
						isRequired={true}
						value={this.state.title}
						onChange={this.handleTitleChange}
					/>
					<InputField
						label={'Collection URL'}
						placeholder={'my-collection'}
						isRequired={true}
						helperText={`${window.location.origin}/${this.state.slug}`}
						value={this.state.slug}
						onChange={this.handleSlugChange}
					/>
					<InputField
						label={'Description'}
						isTextarea={true}
						value={this.state.description}
						onChange={this.handleDescriptionChange}
					/>
					<InputField error={this.props.error && 'Error Creating Collection'}>
						<Button
							name={'login'}
							type={'submit'}
							className={'pt-button pt-intent-primary'}
							onClick={this.handleCreateSubmit}
							text={`Create ${this.props.isPage ? 'Page' : 'Collection'}`}
							disabled={!this.state.title || !this.state.slug}
							loading={this.props.isLoading}
						/>
					</InputField>
				</form>
			</div>
		);
	}
}

DashboardCreateCollection.propTypes = propTypes;
DashboardCreateCollection.defaultProps = defaultProps;
export default DashboardCreateCollection;