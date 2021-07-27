import React from 'react';
import { logoutUser } from '../store/actions/auth';
import { connect } from "react-redux";
import { withRouter, useHistory,Link } from 'react-router-dom';


const Navber = (props) => {

   const history=useHistory();

   const Logout = () => {
    props.logoutUser(history);
  }

    return (
        <div>
              <div className = "row" style ={{width:'100%'}}>
         <div className= "s12 m12 l12" >
            <nav>
               <div className= "nav-wrapper white">
               {localStorage.getItem("jwt") ? 
                  <React.Fragment>
                  <Link to="/userregister"><button className="btn waves-effect waves-light" style={{marginLeft:'12px'}} type="submit" name="action">Add new user
                  </button></Link>
                    <ul id = "nav-mobile" className= "right hide-on-med-and-down">
                     <li><button className="btn waves-effect waves-light" style={{marginRight:'12px'}} type="submit" name="action" onClick={()=>Logout()}>Logout
                     </button></li>
                  </ul>
                  </React.Fragment>
               :
                  null
               }
               </div>
            </nav>
         </div>
      </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        isLoggedIn: state.AuthReducers.isLoggedIn
    };
}
function mapDispatchToProps(dispatch) {
    return {
        logoutUser: (history) => dispatch(logoutUser(history))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navber));