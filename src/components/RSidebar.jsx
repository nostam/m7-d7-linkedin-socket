import React from "react"
import {Image} from "react-bootstrap"



export default class RSidebar extends React.Component{
    state={
        Me:[]
    }


    async componentDidMount() {
        try {
          const MeFetch = await fetch(
            "https://striveschool-api.herokuapp.com/api/profile/me",
            {
              headers: {
                Authorization: process.env.REACT_APP_TOKEN,
              },
            }
          );
          const MeResponse = await MeFetch.json();
          this.setState({ Me: MeResponse });
        } catch (error) {
          console.log(error);
        }
      }

    render(){
        return(
            <>
                <div className="RightSidebar">
                    <Image src={this.state.Me.image} roundedCircle className="postModalImg"/>
                    <div>
                        <p className="mb-0">{this.state.Me.name + " " + this.state.Me.surname}</p>
                        <p>{this.state.Me.title}</p>
                        <hr/>
                        <div>
                        </div>
                    </div>
                </div>

            </>

        )
    }
}