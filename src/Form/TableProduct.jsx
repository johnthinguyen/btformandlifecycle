import React, { Component } from 'react'

export default class TableProduct extends Component {
    render() {
        const { arr } = this.props;
        return (
            <div>
                <table className='table'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Mã Sinh Viên</th>
                            <th>Họ Tên</th>
                            <th>Số Điện Thoại</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {arr.map(({ maSv, name, soDienThoai, email }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{maSv}</td>
                                    <td>{name}</td>
                                    <td>{soDienThoai}</td>
                                    <td>{email}</td>

                                    <button className='btn btn-success mx-2'>Edit</button>
                                    <button className='btn btn-warning' onClick={() => { this.props.handleSv(maSv) }}>Delete</button>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}
