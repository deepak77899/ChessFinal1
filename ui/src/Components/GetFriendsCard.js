import {
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
   
  export function GetFriendsCard({friend}) {
    return (
      <Card className="w-[100%]">
       <div className="flex justify-around w-[100%]">
       <Avatar variant="circular" alt="candice" src={`https://api.dicebear.com/5.x/initials/svg?seed=${friend.username }`} />
       <div>
              <Typography variant="h6" color="blue-gray">
               {friend.username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {friend.email}
              </Typography>
            </div>
       </div>
      </Card>
    );
  }