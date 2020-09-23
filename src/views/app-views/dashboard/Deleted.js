import React from 'react'
import ServiceQuote from './ServiceQuote'
import ContactEnquiry from './ContactEnquiry'
import ReportError from './ReportError'
import UserFeedback from './UserFeedback'
import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


function Deleted() {
    const [selected,setSelected] = React.useState("Service Quotes")

    const handleMenuClick=(e)=> {
        switch(e.key){
            case "1":
                setSelected("Service Quotes")
                break;
            case "2":
                setSelected("Contact Enquiries")
                break;
            case "3":
                setSelected("Reported Errors")
                break;
            case "4":
                setSelected("User Feedbacks")
                break;
            default:
              setSelected("Service Quotes")
        }
      }
    
    const SelectedComponent=(s)=> {
    switch(s){
        
        case "Contact Enquiries":
            return <ContactEnquiry deleted/>
        case "Reported Errors":
            return <ReportError deleted/>
        case "User Feedbacks":
            return <UserFeedback deleted/>
        default:
            return <ServiceQuote deleted/>
    }
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1">
            Service Quotes
          </Menu.Item>
          <Menu.Item key="2" >
            Contact Enquiries
          </Menu.Item>
          <Menu.Item key="3" >
            Reported Errors
          </Menu.Item>
          <Menu.Item key="4">
            User Feedbacks
          </Menu.Item>
        </Menu>
      );
    return (
        <div>
            <Dropdown trigger={['click']}  className="ml-3 mt-3 mb-1" overlay={menu}>
            <Button>
                {selected} <DownOutlined />
            </Button>
            </Dropdown>
            {SelectedComponent(selected)}
            
        </div>
    )
}

export default Deleted
