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
   
  export function SearchCard({item,setSearchItem}) {
    const { user } = useSelector((state) => state.auth);
    const handleClick=(e)=>{
        console.log("req send krne se phele id",user._id,item._id);
            sendReqAPI(item,user);
            setSearchItem((prev)=>{
              prev=prev.filter(obj=>obj._id!==item._id);
              return prev;
                        })
    }
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
            <button className='ml-12' onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>
</button>

          
          </ListItem>
        </List>
      </Card>
    );
  }