import PersonIcon from '@mui/icons-material/Person';

import {
  ListItem as MdlListItem,
  ListItemIcon,
  IconButton,
  ListItemText
} from '@mui/material';

const ListItem = ({ primary, secondary, action }) => {
  return (
    <MdlListItem secondaryAction={action}>
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