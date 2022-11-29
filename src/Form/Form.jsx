import React, { Component } from 'react'
import TableProduct from './TableProduct'
export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            values: {
                maSv: '',
                soDienThoai: '',
                name: '',
                email: '',
            },
            errors: {
                maSv: '',
                soDienThoai: '',
                name: '',
                email: '',
            },
            valid: false,
            arrSV: [{
                maSv: '123',
                soDienThoai: '0337259636',
                name: 'nguyen ngoc thi',
                email: 'ngocthi@gmail.com',
            }],
        }
    }
    checkFormValid = () => {
        let { values, errors } = this.state;
        for (let key in errors) {
            if (errors[key] !== '' || values[key] === '') {
                return false
            }
        } return true;
    }

    handleInputChange = (e) => {
        let { value, id } = e.target;
        let dataType = e.target.getAttribute('data-type')
        let dataMaxLength = e.target.getAttribute('data-maxLength');
        let dataMinLength = e.target.getAttribute('data-minLength')
        //formvalue
        let newFormValue = this.state.values;
        newFormValue[id] = value;
        //formerrors
        let newFormError = this.state.errors;
        let message = '';
        if (value.trim() === '') {
            message = id + ' not be blank'
        } else {
            if (dataType == 'number') {
                let regexNumber = /^\d+(,\d{1,2})?$/;
                if (!regexNumber.test(value)) {
                    message = id + ' is only  numbers'
                }
            }
            if (dataType == 'string') {
                let regexString = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
                if (!regexString.test(value)) {
                    message = id + ' is only alpha'
                }
            }
            if (dataType == 'email') {
                let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!regexEmail.test(value)) {
                    message = id + ' is invalid (example@gmail.com)';
                }
            }
            if (dataMaxLength !== null && value.length > dataMaxLength || value.length < dataMinLength) {
                message = id + ` must be set ${dataMinLength}-${dataMaxLength} Characters`
            }
        }
        newFormError[id] = message;

        //setState
        this.setState({
            errors: newFormError,
            values: newFormValue
        }, () => {
            this.setState({
                valid: this.checkFormValid()

            })
        })

    }
    handleDelSv = (masvClick) => {
        let arrSV = this.state.arrSV.filter(arr => arr.maSv !== masvClick)
        this.setState({
            arrSV: arrSV
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.checkFormValid()) {
            alert(`don't inspect`)
            return;
        }
        console.log(this.state)
        let arrSv = this.state.arrSV;
        arrSv.push({ ...this.state.values })
        this.setState({
            arrSV: arrSv
        })

    }
    render() {
        return (
            <div >
                <form onSubmit={this.handleSubmit} >
                    <div className="card" >
                        <div className="card-header bg-dark text-white">
                            Thông tin sinh viên
                        </div>
                        <div className="card-body bg-light text-dark text-monospace">
                            <div className="row container ">
                                <div className="col-6">
                                    <p>Mã SV</p>
                                    <input id='maSv' data-maxLength={8} data-minLength={3} data-type='maSv' className='form-control ' placeholder='20H10xxxxxxx' onInput={this.handleInputChange} />
                                    {this.state.errors.maSv && <div className='alert alert-danger mt-2'>{this.state.errors.maSv}</div>}
                                    <p className='mt-3'>Số Điện Thoại</p>
                                    <input id='soDienThoai' data-type='number' className='form-control' placeholder='09xxxxxxxx' onInput={this.handleInputChange} />
                                    {this.state.errors.soDienThoai && <div className='alert alert-danger mt-2'>{this.state.errors.soDienThoai}</div>}

                                </div>
                                <div className="col-6">
                                    <p>Họ Tên</p>
                                    <input data-type='string' className='form-control ' id='name' placeholder='Nguyen Van A' onInput={this.handleInputChange} />
                                    {this.state.errors.name && <div className='alert alert-danger mt-2'>{this.state.errors.name}</div>}
                                    <p className='mt-3'>Email</p>
                                    <input type="text" id="email" data-type='email' className='form-control ' placeholder='example@gmai.com' onInput={this.handleInputChange} />
                                    {this.state.errors.email && <div className='alert alert-danger mt-2'>{this.state.errors.email}</div>}
                                </div>

                            </div>
                            <button type='submit' className='btn btn-success m-3' disabled={!this.state.valid}>Thêm sinh viên</button>
                        </div>
                    </div>
                </form>

                <div className="mt-2 container ">
                    <TableProduct arr={this.state.arrSV} handleSv={this.handleDelSv} />
                </div>
            </div >
        )
    }
}
