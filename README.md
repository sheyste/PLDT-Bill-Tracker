# PLDT-Bill-Tracker
Records PLDT Bill in Google Sheets


----

#Steps

1. Make a Blank Sheet
   <img width="1778" height="904" alt="image" src="https://github.com/user-attachments/assets/8977ccc0-b828-4566-bd63-01499684fa3a" />

3. Rename Sheet name to PLDT
   <img width="297" height="152" alt="image" src="https://github.com/user-attachments/assets/7da7c6bf-e040-408f-914a-f2eba3d957f6" />

5. Open Extention and select Appscript
6. Paste the code from Code.gs
7. Save and run code
8. To automaticaly fetch data from gmail, Add Triggers.
   - Choose which function to run : extractPLDTeInvoice
   - Select event source : Timr-Driven
   - Select type of time based trigger : Day Timer
   - Select time of day : Select any time range you want to get Data
9. Save
