import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,Button
  } from "@material-tailwind/react";
  import { sendReqAPI } from "../services/operations/sendReqAPI";
  import { useSelector } from 'react-redux';
   
  export function Friends({item,setSearchItem}) {
    const { user } = useSelector((state) => state.auth);

    return (
      <Card className='w-full mt-1'>
        <List>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src={`https://api.dicebear.com/5.x/initials/svg?seed=${item.username}`} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
               {item .username}
              </Typography>
              
            </div>
  

          
          </ListItem>
        </List>
      </Card>
    );
  }