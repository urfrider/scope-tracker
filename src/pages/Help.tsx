import styled from "styled-components";
import Menubar from "../components/Menubar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Top = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
  flex: 1;
  justify-content: center;
  height: 80px;
  padding: 20px;
  h1 {
    font-size: 1.6rem;
    color: #a68c71;
  }
`;
const MainContainer = styled.div`
  flex: 1;
  .description {
    display: flex;
    flex-direction: column;
    margin-left: 0px;
    margin-bottom: 15px;
    font-size: 1.1rem;
    font-weight: Bold;
  }
`;

function Help() {
  return (
    <Container>
      <Menubar />
      <MainContainer>
        <Top>
          <h1>HELP</h1>
        </Top>
        <div className="description">
          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: "#94795d" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 20, color: "#f1f2f6" }}
              >
                Dashboard
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontWeight: 700 }}>
                The Dashboard has 3 main components:
              </Typography>
              &nbsp;
              <Typography>
                1) Schedule: This component can access the schdeule page to view
                the current schedule for the month
              </Typography>
              &nbsp;
              <Typography>
                2) Equipment Status: This component can access the equipment
                status page
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: "#94795d" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 20, color: "#f1f2f6" }}
              >
                Schedule
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontWeight: 700 }}>
                The Schedule Page:
              </Typography>
              &nbsp;
              <Typography>
                1) View previous and following months for events schedules by
                clicking on the next and previous buttons.
              </Typography>
              &nbsp;
              <Typography>
                2) Today button: click on it to view the current date.
              </Typography>
              &nbsp;
              <Typography>
                3) Click on Day: to view the scopes scheduled for the day.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: "#94795d" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 20, color: "#f1f2f6" }}
              >
                Equipment Status
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontWeight: 700 }}>
                The Equipment Status Page:
              </Typography>
              &nbsp;
              <Typography>
                1) Update button: To navigate to the barcode scanner page to
                scan barcode of the scope.
              </Typography>
              &nbsp;
              <Typography>
                2) Edit button: To pop up the edit modal to perform a quick edit
                on the scope status
              </Typography>
              &nbsp;
              <Typography>
                3) Details button: To pop up the details modal to show the
                details of the scope selected
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: "#94795d" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 20, color: "#f1f2f6" }}
              >
                Scanner
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontWeight: 700 }}>
                The Scanner page:
              </Typography>
              <Typography>
                Place the barcode of the scope within the scanner and scan it to
                be brought to the update page.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: "#94795d" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 20, color: "#f1f2f6" }}
              >
                Menu Bar
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontWeight: 700 }}>The Menu Bar:</Typography>
              &nbsp;
              <Typography>
                Home Icon: Navigates to the main page to view the dashboard
              </Typography>
              &nbsp;
              <Typography>
                Calendar Icon: Navigates to the schedule page to view the
                monthly schedule for scopes
              </Typography>
              &nbsp;
              <Typography>
                Scanner Icon: To scan the barcode of the scanner and update the
                status of the equipment
              </Typography>
              &nbsp;
              <Typography>Person Icon: To view user profile</Typography>
              &nbsp;
              <Typography>Help Icon: To view help documentation</Typography>
              &nbsp;
              <Typography>
                Logout Icon: To logout from the application
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </MainContainer>
    </Container>
  );
}

export default Help;
