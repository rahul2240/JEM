import React, { Component } from 'react';
import superagent from 'superagent'; 
import SideBar from '../SideBar';
import './event.css';
import Moment from 'react-moment';
import bell from  '../../bell.png';
import belltwo from '../../bell2.png'
import cross from '../../cross.png';
class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      expand: false,
      individualEvent: { } ,
      imageSource: belltwo
    }
  }

  getAuthenticationToken() {
    return localStorage.getItem('token');
  }

  handleDelete(id) {
    console.log(id)
    const remainingEvents = this.state.event.filter(event => event._id !== id)
    console.log({remainingEvents});
    this.setState({
      event: remainingEvents
    })
    superagent
     .del('http://54.157.21.6:8089/events/' + id)
      .set('x-auth' , this.getAuthenticationToken())
      .then(res => {
        console.log(res);
      })
      .catch(err =>
         console.log(err)
        );
  }
  ExpandMore(id)
  {
    console.log(id);
    superagent
      .get('http://54.157.21.6:8089/events/' + id)
      .set("Content-Type", "application/json")
      .then(res => {
        const event = res.body;
         this.setState({ 
          individualEvent: event,
          expand: true
           });  
         console.log(this.state.individualEvent)     
      })
      .catch(err => {
        console.log("error", err);
      });
  }
  ExpandLess = () => {
    this.setState({
      expand: false
    })
  }
  ImageChange(id) {
    document.getElementById(id).src=bell
   let notices = localStorage.getItem('notices')
   if(notices){
    notices = notices.split(',');
    notices.push(id);
    localStorage.setItem('notices' , notices);
   }
   else {
    notices = new Array();
    notices.push(id);
    localStorage.setItem('notices' , notices);
   }
  }
  componentDidMount() {
    superagent
      .get('http://54.157.21.6:8089/')
      .set("Content-Type", "application/json")
      .then(res => {
        const event = res.body;
         this.setState({ event: event });       
      })
      .catch(err => {
        console.log("error", err);
      });
  }

render() {
   const isExpand = this.state.expand;
  return (
    <div> 
    { !isExpand ? (
      <div>
        <div className="container-fluid">
          <SideBar />
          {this.state.event.map(data => {
            const date = data.date;
            let notices = localStorage.getItem('notices');
            let isNotified = false;
            if(notices){
              notices=notices.split(',');
              if(notices.indexOf(data._id)>=0)
              { 
                isNotified=true;
              }
            }
            return (
              <div key={data._id} className="row">
                <div className="col-8">
                  <h4 style={{textTransform: 'capitalize' , marginBottom: '1px'}}>
                          {data.name}
                  </h4>
                  <p>NIBBLE COMPUTER SOCIETY</p>
                  <button className="btn btn-link"
                  onClick={this.ExpandMore.bind(this, data._id)}
                  >
                  READ MORE</button>
                </div>
                <div className="col-4">
                  <button className="bell"
                  onClick={this.ImageChange.bind(this, data._id)}
                   style={{float: 'right'}}>
                   
                   { isNotified ? (
                       <img src={bell} id={data._id} width="50px" height="50px" alt="notified"/> 
                       ) : (
                       <img src={belltwo} id={data._id} width="50px" height="50px" alt="notify me"/> 
                       )
                     }
                                    </button>
                  <br/><br/><br/>
                  <p style={{float: 'right', paddingRight: '20px'}}>
                    <Moment format="YYYY/MM/DD">
                {date}
            </Moment>
                  </p>
                </div>
              </div>
                )}
            )
          }
        </div>
        <div className="nibble">
          <p className="text-center" style={{fontSize: '14px' , marginBottom: '0px'}}>
            Nibble Computer Society
          </p>
         </div>
      </div>
        ):
        (
            <div style={{paddingTop: '0px'}}>
            <button style={{position: 'absolute' , right:'20px' , top:'20px'}}
            className="close"
            onClick={this.ExpandLess}
            >
             <img src={cross} width="30px" height="30px" alt="close" />
              </button>
            <section className="upper">
              <h1 className="text-center">{this.state.individualEvent.event.name}</h1>
              <h3 className="text-center">Nibble Computer Society</h3>
              <hr style={{borderBottom: '2px solid rgba(255,255,255,0.8)'}} />
              </section>
              <section className="lower">
              <p style={{fontSize: '14px'}}>{this.state.individualEvent.event.description}</p>
              <br/>
              <hr style={{borderBottom: '2px solid rgba(255,255,255,0.8)'}} />
              </section>
              <div className="nibble">
                <p className="text-center" style={{fontSize: '14px' , marginBottom: '0px'}}>
                  Nibble Computer Society
                </p>
              </div>
            </div>



            
          )
        }
    </div>
    );
}
}
export default Event;


