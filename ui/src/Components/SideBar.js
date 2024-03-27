import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { TabsWithIcon } from "./Tabs";
 
export function DrawerDefault() {
  const [open, setOpen] = React.useState(false);
  const [friends,setFriends]=React.useState({});
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
 
  return (
    <React.Fragment>
      <Button onClick={openDrawer} className='w-1 h-1 bg-white mt-6 ml-2 '></Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" >
        Guests
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <TabsWithIcon/>
       
      </Drawer>
    </React.Fragment>
  );
}