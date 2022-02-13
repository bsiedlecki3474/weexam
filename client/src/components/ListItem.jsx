import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';


import {
  ListItem as MdlListItem,
  ListItemIcon,
  IconButton,
  ListItemText
} from '@mui/material';

const ListItem = ({ primary, secondary }) => {
  return (
    <MdlListItem
      secondaryAction={
        <IconButton edge="end" size="small">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText
        primary={primary}
        secondary={secondary}
      />
    </MdlListItem>
  )
}

export default ListItem;