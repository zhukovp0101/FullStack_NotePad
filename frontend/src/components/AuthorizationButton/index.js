import React, {useState} from 'react';
import AuthorizationDialog from './AuthorizationDialog'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Button from '@material-ui/core/Button'
import green from '@material-ui/core/colors/green';


const AuthorizationButton = ({onClick}) => {
    const [openDialog, setOpenDialog] = useState(false);
    return (
    <div>
            <Button
            variant="outlined"
            style={{ color: green[500] }}
            startIcon={<AccountCircleOutlinedIcon />}
            onClick={()=>{setOpenDialog(true)}}
          >
            Sign In
          </Button>
            <AuthorizationDialog open={openDialog} onClose={()=>{setOpenDialog(false)}} onSignIn={onClick}/>
    </div>
    )
}

export default AuthorizationButton;