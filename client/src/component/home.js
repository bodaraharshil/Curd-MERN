import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { userGet, userDelete, userUpdate } from '../store/actions/users';
import { connect } from 'react-redux';
import Navbar from './navbar';
import Pagination from "react-js-pagination";
import '../App.css';
// import "bootstrap/less/bootstrap.less";
// bootstrap/less/bootstrap.less
const Home = (props) => {
    const [activePage, setactivePage] = useState(1);
    const [TotalItem, setTotalItem] = useState(props.usersList.doc ? props.usersList.doc : 2);
    const history = useHistory();
    useEffect(() => {
        props.userGet(activePage);
        setTotalItem(props.usersList.doc);
    }, [props.usersList.doc]);
    const userdelete = (id) => {
        props.userDelete(id);
        props.userGet();
    }
    // const userupdate = (id) => {
    //     props.userUpdate(id);
    //     props.userGet();
    // }
    const userupdatepage = (item) => {
        history.push({ pathname: "/userregister", state: item });
    }
    const user = JSON.parse(localStorage.getItem("username"));
    const pageChange = (page) => {
        setactivePage(page);
        props.userGet(page);
    }
    return (
        <React.Fragment>
            <Navbar />
            <br />
            <div className="card aligin" style={{ width: "60%", justifyContent: 'center', margin: '0 auto' }}>
                <table>
                    <thead className="#e57373 red lighten-2">
                        <tr>
                            <th style={{ textAlign: 'center' }}>No</th>
                            <th style={{ textAlign: 'center' }}>Name</th>
                            <th style={{ textAlign: 'center' }}>Email</th>
                            <th style={{ textAlign: 'center' }}>Username</th>
                            <th style={{ textAlign: 'center' }}>Image</th>
                            <th width="15%" style={{ textAlign: 'center' }}>Address</th>
                            {user === 'abc' ?
                                <th style={{ textAlign: 'center' }}>Action</th>
                                :
                                null
                            }

                        </tr>
                    </thead>
                    <tbody>
                    {
                        props.usersList.data && Object.values(props.usersList.data).map((item, index) => {
                            return (
                                <React.Fragment>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{index+1}</td>
                                        <td style={{ textAlign: 'center' }}>{item.Name}</td>
                                        <td style={{ textAlign: 'center' }}>{item.Email}</td>
                                        <td style={{ textAlign: 'center' }}>{item.Username}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <img src={`http://localhost:5000/public/${item.Photo}`} alt="mypic" style={{ height: "80px" }} /></td>
                                        {/* <td style={{ textAlign: 'center' }}><img src={item.Photo} width="60px" height="60px"></img></td> */}
                                        <td style={{ textAlign: 'center' }}>{item.Address}</td>
                                        {user === 'abc' ?
                                            <td style={{ textAlign: 'center' }}>
                                                <i className="material-icons" style={{ cursor: "pointer" }} onClick={() => userupdatepage(item)}>create</i>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="material-icons" style={{ cursor: "pointer" }} onClick={() => userdelete(item._id)}>delete</i>
                                            </td>
                                            :
                                            null
                                        }
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div style={{marginLeft:'800px'}}>
            <Pagination
                    activePage={activePage}
                    itemsCountPerPage={3}
                    totalItemsCount={TotalItem}
                    pageRangeDisplayed={5}
                    onChange={pageChange}
            />
            </div>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        usersList: state.UserReducers.userList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userGet: (page) => dispatch(userGet(page)),
        userDelete: (id, history) => dispatch(userDelete(id, history)),
        userUpdate: (id, history) => dispatch(userUpdate(id, history))
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
