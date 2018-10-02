import React, { Component } from "react";
import QtyConverter from "../../modules/QtyConverter";
import { Button, Message, Input, Popup, Divider, Icon, Modal } from "semantic-ui-react";

export default class PantryItemEditCard extends Component {
    state = {
        open: false,
        itemName: "",
        itemAmount: "",
        itemQuantityType: "",
        convertQuantityType: "",
        tossAmount: "",
        tossQuantityType: "",
        renderEdit: false,
        nameTaken: false,
        nameSimilar: false,
        convertQuantity: false,
        rewriteQty: false,
        tossQty: false,
        editName: false,
        noRewrite: false,
        emptyToss: false
    }

    componentDidMount(){
        this.setState({
            itemAmount: QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name),
            itemQuantityType: this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name,
        })
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    renderEdit = () => {
        this.setState({renderEdit: true})
    }

    handleNameEdit = () => {
        let editedItem = this.state.itemName
        let otherItems = this.props.pantryItems.filter(pI => pI.name !== this.props.pantryItem.name)
        if(editedItem.toLowerCase() === this.props.pantryItem.name.toLowerCase()){
            this.setState({noNameChange: true, nameTaken: false, nameSimilar: false})
        } else if(otherItems.find(item => item.name.toLowerCase() === editedItem.toLowerCase())){
            this.setState({nameTaken: true, nameSimilar: false, noNameChange: false})
        } else if(otherItems.find(item => item.name.toLowerCase().includes(editedItem.toLowerCase())) || otherItems.find(item => editedItem.toLowerCase().includes(item.name.toLowerCase()))){
            this.setState({nameSimilar: true, nameTaken: false, noNameChange: false})
        } else {
            this.props.editPantryItem(this.props.pantryItem.id, { name: editedItem })
            .then(() => this.setState({editName: false, nameTaken: false, nameSimilar: false, noNameChange: false}))
        }
    }

    handleQtyRewrite = () => {
        let newQty = parseInt(this.state.itemAmount, 0);
        let newQtyType = this.state.itemQuantityType;
        let oldQty = QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name);
        let oldQtyType = this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name;
        if(newQty === oldQty && newQtyType === oldQtyType){
            this.setState({noRewrite: true})
        } else {
            let rewriteQty = {
                quantity: QtyConverter.convertToTSP(newQty, newQtyType), 
                quantityTypeId: this.props.quantityTypes.find(type => type.name === newQtyType).id
            }
            this.props.editPantryItem(this.props.pantryItem.id, rewriteQty)
            .then(() => this.setState({noRewrite: false, rewriteQty: false}))
        }
    }

    handleTossQty = () => {
        if(this.state.tossAmount === "" || this.state.tossQuantityType === ""){
            this.setState({emptyToss: true})
        } else {
            let timesTrashed = this.props.pantryItem.timesTrashed + 1
            let tossQty = QtyConverter.convertToTSP(parseInt(this.state.tossAmount, 0), this.state.tossQuantityType)
            let newQty = this.props.pantryItem.quantity - tossQty
            if(newQty < 0){
                newQty = 0
            }
            this.props.editPantryItem(this.props.pantryItem.id, {quantity: newQty, timesTrashed: timesTrashed})
            .then(() => this.setState({tossQty: false, emptyToss: false, tossAmount: "", tossQuantityType: ""}))
        }
    }

    convertQuantity = () => {
        let pantryItem = this.props.pantryItem
        pantryItem.quantityTypeId = this.props.quantityTypes.find(type => type.name === this.state.convertQuantityType).id
        this.props.editPantryItem(pantryItem.id, pantryItem)
        .then(() => this.setState({convertQuantity: false}))
    }

    handleDelete = () => {
        this.props.editPantryItem(this.props.pantryItem.id, {visible: false})
    }

    renderQuantityConvert = () => {
        this.setState({convertQuantity: true})
    }

    show = size => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })
    
    render(){
        const { open, size } = this.state
        return (
            <div>
            {
                !this.state.renderEdit &&
                !this.state.convertQuantity &&
                <div className="pantry-item-card">
                    
                    <Message floating className="edit-pantry-item pantry-teal-bg">
                        <div className="button-right">
                            <Icon name="times circle outline" color="grey" size="large" onClick={this.show('tiny')} />
                            <Modal size={size} dimmer="blurring" open={open} onClose={this.close}>
                                <Modal.Header className="centered">Delete this Pantry Item?</Modal.Header>
                                <Modal.Content>
                                    <Message floating size="tiny" className="edit-red-bg" header={{ content: "Note:", className: "centered" }} content="Pantry Ingredients that you choose to delete here will remain in any recipes they are called for in. Should you decide to bring this Ingredient back into your Pantry someday, Simply type the name and amount into the add item area and you will be prompted to bring it back." />
                                </Modal.Content>
                                <Modal.Actions>
                                    <div className="button-center">
                                        <Button basic color="orange" size="mini" animated onClick={this.close}>
                                            <Button.Content visible>Back</Button.Content>
                                            <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                                        </Button>
                                        <Button basic color="red" size="mini" animated onClick={this.handleDelete}>
                                            <Button.Content visible>Remove</Button.Content>
                                            <Button.Content hidden><Icon name="times circle outline" /></Button.Content>
                                        </Button>
                                    </div>
                                </Modal.Actions>
                            </Modal>
                        </div>
                        <div className="pantry-item">
                            <Message.Header className="pantry-item-header-left">{this.props.pantryItem.name}</Message.Header>
                            <Message.Header className="pantry-item-header-right">{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</Message.Header>
                        </div>
                        <div className="edit-footer button-center">
                            <Button basic color="orange" size="mini" animated onClick={this.renderEdit}>
                                <Button.Content visible>Edit</Button.Content>
                                <Button.Content hidden><Icon name="sync" /></Button.Content>
                            </Button>
                            <Button basic color="blue" size="mini" animated onClick={this.renderQuantityConvert}>
                                <Button.Content visible>Convert</Button.Content>
                                <Button.Content hidden><Icon name="calculator" /></Button.Content>
                            </Button>
                        </div>
                    </Message>
                </div>
            }
            {
                this.state.convertQuantity &&
                <div className="pantry-item-card pantry-convert-card">
                    <Message floating className="edit-pantry-item edit-blue-bg">
                        <Message.Header className="pantry-convert-header">{this.props.pantryItem.name}</Message.Header>
                        <div className="pantry-edit-flex">
                            <div className="edit-item-left">Current: </div>
                            <div className="edit-item-right">{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name}</div>
                        </div>
                        <Divider horizontal>convert to</Divider>
                        <div className="pantry-edit-flex">
                            <Input size="mini" list="types" id="convertQuantityType" className="convert-type" placeholder={this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name} onChange={this.handleFieldChange} />
                                <datalist id="types">
                                    {
                                        this.props.quantityTypes.map(type => {
                                            if(type.id !== this.props.pantryItem.quantityTypeId){
                                                return <option key={type.id} defaultValue={type.name}>{type.name}</option>  
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </datalist>
                        </div>
                        <div className="edit-footer button-center">
                                <Button basic animated color="red" size="mini" onClick={() => {this.setState({convertQuantity: false})}}>
                                    <Button.Content visible>Back</Button.Content>
                                    <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                                </Button>
                                <Button basic animated color="blue" size="mini" onClick={this.convertQuantity}>
                                    <Button.Content visible>Convert</Button.Content>
                                    <Button.Content hidden><Icon name="calculator" /></Button.Content>
                                </Button>
                        </div>
                    </Message>
                </div>
            }
            {
                this.state.renderEdit &&
                <div className="pantry-item-card pantry-edit-card">
                    <Message floating className="edit-pantry-item edit-orange-bg">
                        <div className="button-right">
                            <Button basic size="mini" color="red" animated onClick={() => {this.setState({renderEdit: false})}}>
                                <Button.Content visible>Back</Button.Content>
                                <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                            </Button>
                        </div>
                        <Divider horizontal>Edit Name</Divider>
                        {
                            !this.state.editName &&
                            <div>
                                <Message.Header className="centered">{this.props.pantryItem.name}</Message.Header>
                                <div className="button-center input-margin">
                                    <Button size="mini" animated basic color="orange" onClick={() => this.setState({editName: true})}>
                                        <Button.Content visible>Edit</Button.Content>
                                        <Button.Content hidden><Icon name="edit" /></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            this.state.noNameChange &&
                            this.state.editName &&
                            <div>
                                <Message floating size="mini" color='red' className="align-center">You didn't make any changes</Message>
                                <Input error label={{ color: 'red', labelPosition: 'left', content: 'Name'}} type="text" id="itemName" className="input-margin" size="mini" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />    
                                <div className="button-center">
                                    <Button basic color="orange" size="mini" animated onClick={this.handleNameEdit}>
                                        <Button.Content visible>Save</Button.Content>
                                        <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                                    </Button>
                                    <Button basic color="red" size="mini" animated onClick={() => this.setState({editName: false})}>
                                        <Button.Content visible>Back</Button.Content>
                                        <Button.Content hidden><Icon name="arrow left"/></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            this.state.nameTaken &&
                            this.state.editName &&
                            <div>
                                <Message floating size="mini" color='red' className="align-center">Another item in your panty has this name</Message>
                                <Input error label={{ color: 'red', labelPosition: 'left', content: 'Name'}} type="text" id="itemName" className="input-margin" size="mini" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />    
                                <div className="button-center">
                                    <Button basic color="orange" size="mini" animated onClick={this.handleNameEdit}>
                                        <Button.Content visible>Save</Button.Content>
                                        <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                                    </Button>
                                    <Button basic color="red" size="mini" animated onClick={() => this.setState({editName: false})}>
                                        <Button.Content visible>Back</Button.Content>
                                        <Button.Content hidden><Icon name="arrow left"/></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            this.state.nameSimilar &&
                            this.state.editName &&
                            <div>
                                <Message floating size="mini" color='red' className="align-center">Another item in your panty currently or in the past has a similar name to this! Consider bringing those back instead!</Message>
                                <Input error size="mini" label={{ color: 'red', labelPosition: 'left', content: 'Name'}} type="text" id="itemName" className="input-margin" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />
                                <div className="button-center">
                                    <Button basic color="orange" size="mini" animated onClick={this.handleNameEdit}>
                                        <Button.Content visible>Save</Button.Content>
                                        <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                                    </Button>
                                    <Button basic color="red" size="mini" animated onClick={() => this.setState({editName: false})}>
                                        <Button.Content visible>Back</Button.Content>
                                        <Button.Content hidden><Icon name="arrow left"/></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            !this.state.nameTaken &&
                            !this.state.nameSimilar &&
                            !this.state.noNameChange &&
                            this.state.editName &&
                            <div>
                                <Popup position="top center" wide className="warning-popup" trigger={<Input label={{ color: 'orange', labelposition: 'left', content: 'Name'}} type="text" id="itemName" className="input-margin" size="mini" defaultValue={this.props.pantryItem.name} onChange={this.handleFieldChange} />} header={{content: "WARNING!", className: "centered"}} content="Changing the name here will change it in every Recipe that it's used in! Please only edit a name to fix spelling" />
                                <div className="button-center">
                                    <Button basic color="orange" size="mini" animated onClick={this.handleNameEdit}>
                                        <Button.Content visible>Save</Button.Content>
                                        <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                                    </Button>
                                    <Button basic color="red" size="mini" animated onClick={() => this.setState({editName: false})}>
                                        <Button.Content visible>Back</Button.Content>
                                        <Button.Content hidden><Icon name="arrow left"/></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        }
                        <Divider horizontal>Change Quantity</Divider>
                        <Message.Header className="centered header-margin">{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name}</Message.Header>
                        {
                            this.state.rewriteQty &&
                            <div className="qty-edit">
                                {
                                    !this.state.noRewrite &&
                                    <Message floating className="edit-red-bg centered" size="tiny" content="Reset the Amount of this Pantry Item to whatever you'd like" />
                                }
                                {
                                    this.state.noRewrite &&
                                    <Message error  size="tiny" content="Please change the original quantity or click back to cancel." />
                                }
                                <Input size="mini" label={{ color: 'red', content: 'Amount'}} labelPosition='left' type="number" id="itemAmount" className="input-margin" placeholder={QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} onChange={this.handleFieldChange} />
                                <Input list='types' fluid id="itemQuantityType" className="input-margin" size="mini" label={{ color: 'red', labelposition: 'left', content: 'Quantity Type'}} placeholder={this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name} onChange={this.handleFieldChange} />
                                    <datalist id='types'>
                                        {
                                            this.props.quantityTypes.map(type => <option key={type.id} value={type.name} />)
                                        }
                                    </datalist>
                                <div className="button-center">
                                    <Button size="mini" basic color="orange" animated onClick={this.handleQtyRewrite}>
                                        <Button.Content visible>Save</Button.Content>
                                        <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                                    </Button>
                                    <Button size="mini" basic color="red" animated onClick={() => this.setState({rewriteQty: false})}>
                                        <Button.Content visible>Back</Button.Content>
                                        <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            this.state.tossQty &&
                            <div className="qty-edit">
                                <Message floating className="edit-orange-bg centered" size="tiny" content="How much are you throwing out?" />
                                <Input size="mini" label={{ color: 'orange', content: 'Amount'}} labelPosition='left' type="number" id="tossAmount" className="input-margin" placeholder="Number" defaultValue={this.state.tossAmount} onChange={this.handleFieldChange} />
                                <Input list='types' fluid id="tossQuantityType" className="input-margin" size="mini" label={{ color: 'orange', labelposition: 'left', content: 'Quantity Type'}} placeholder="Quantity Type" onChange={this.handleFieldChange} />
                                    <datalist id='types'>
                                        {
                                            this.props.quantityTypes.map(type => <option key={type.id} value={type.name} />)
                                        }
                                    </datalist>
                                {
                                    this.state.emptyToss &&
                                    <Message error compact size="mini" icon="arrow up" content="Please fill out all fields." />
                                    
                                }
                                <div className="button-center input-margin">
                                    <Button size="mini" basic color="orange" animated onClick={this.handleTossQty}>
                                        <Button.Content visible>Save</Button.Content>
                                        <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                                    </Button>
                                    <Button size="mini" basic color="red" animated onClick={() => this.setState({tossQty: false})}>
                                        <Button.Content visible>Back</Button.Content>
                                        <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            !this.state.rewriteQty &&
                            !this.state.tossQty &&
                            <div className="edit-footer button-center">
                                <Button size="mini" animated basic color="orange" onClick={() => this.setState({tossQty: true})}>
                                    <Button.Content visible>Toss</Button.Content>
                                    <Button.Content hidden><Icon name="trash" /></Button.Content>
                                </Button>
                                <Button size="mini" animated basic color="red" onClick={() => this.setState({rewriteQty: true})}>
                                    <Button.Content visible>Reset</Button.Content>
                                    <Button.Content hidden><Icon name="calculator" /></Button.Content>
                                </Button>
                            </div>
                        }
                    </Message>
                </div>
            }
            </div>
        )
    }
}