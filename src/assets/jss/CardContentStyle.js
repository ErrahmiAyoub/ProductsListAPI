import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({

    CardContent: {
        marginTop: "-60px",
        height: "100%",
        '& .paper': {
            height: "100%",
            textAlign: 'left',
            padding: "16px",
            position: "relative",
            paddingTop: "80px",
        },
    },
    cardContenIcon: {
        '& .title': {
            color: '#707070'
        },
        '& .paper': {
            textAlign: "right",
            padding: '16px',
        }
    },
    cardContenFooter: {
        "& .paper": {
            paddingBottom: "8px"
        },
        "& .footer": {
            textAlign: "left",
            marginTop: "16px",
            borderTop: "1px solid #efefef",
            paddingTop: "8px"
        }
    }
}));