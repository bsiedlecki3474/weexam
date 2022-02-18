import LabelIcon from '@mui/icons-material/Label';

import {
  ListItem as MdlListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

const ListItem = ({ primary, secondary, icon, action }) => {
  return (
    <MdlListItem secondaryAction={action}>
      <ListItemIcon>
        {icon ?? <LabelIcon />}
      </ListItemIcon>
      <ListItemText
        primary={primary}
        secondary={secondary}
      />
    </MdlListItem>
  )
}

export default ListItem;