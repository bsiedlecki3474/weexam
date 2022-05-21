import { Box, Pagination, PaginationItem } from "@mui/material"
import { orange, success } from "@mui/material/colors";
import { alpha } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    // background: '#333',
    // width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  pagination: {
    columnGap: theme.spacing(2)
  },
  checked: {
    color: 'red',
    border: 'red',
    backgroundColor: 'red' 
  }
})

const getItemClasses = type => ({
  fontWeight: 'bold',
  color: `${type}.main`,
  // borderColor: theme => alpha(theme.palette[type].main, 0.5),
  // backgroundColor: theme => alpha(theme.palette[type].main, 0.24)
})

const AssessmentPagination = props => {
  const { classes, count, page, handleChange, answered, flagged, fullWidth } = props

  const isAnswered = page => answered?.includes(page) ? getItemClasses('success') : false;
  const isFlagged = page => flagged?.includes(page) ? getItemClasses('warning') : false;
  const isNotCompleted = getItemClasses('error')

  return (
    <Box className={classes.root} sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <Pagination
        className={classes.pagination}
        // variant="outlined"
        count={count}
        siblingCount={13}
        page={page}
        onChange={handleChange}
        size="medium"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={
              item.type === 'page' && item.page !== page
                ? (isAnswered(item.page) || isFlagged(item.page) || isNotCompleted)
                : {}
            }
          />
        )}
      />
    </Box>
  )
}

export default withStyles(styles)(AssessmentPagination);