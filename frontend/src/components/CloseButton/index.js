import React, {useState} from 'react';
import SimpleDialog from '../SimpleDialog'
import removeSvg from '../../assets/img/remove-icon.svg';

const CloseButton = ({onClick}) => {
    const [openDialog, setOpenDialog] = useState(false);
    return (
    <div>
            <img
              className="close-button"
              src={removeSvg}
              alt="Remove icon"
              onClick={()=>{setOpenDialog(true)}}
            />
            <SimpleDialog open={openDialog} onClose={()=>{setOpenDialog(false)}} title="Вы действительно хотите удалить?" onYes={onClick} onNo={()=>{setOpenDialog(false)}}/>
    </div>
    )
}

export default CloseButton;