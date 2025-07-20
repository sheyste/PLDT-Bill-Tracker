# PLDT-Bill-Tracker
Records PLDT Bill in Google Sheets


----

## Steps

1. Make a Blank Sheet
   
   <img width="1778" height="904" alt="image" src="https://github.com/user-attachments/assets/8977ccc0-b828-4566-bd63-01499684fa3a" />

2. Rename Sheet name to PLDT
   
   <img width="297" height="152" alt="image" src="https://github.com/user-attachments/assets/7da7c6bf-e040-408f-914a-f2eba3d957f6" />

3. Open Extention and select Appscript
4. Paste the code from Code.gs
5. Save and run code
6. To automaticaly fetch data from gmail, Add Triggers.
   - Choose which function to run : extractPLDTeInvoice
   - Select event source : Timr-Driven
   - Select type of time based trigger : Day Timer
   - Select time of day : Select any time range you want to get Data

     <img width="1054" height="899" alt="image" src="https://github.com/user-attachments/assets/c1679925-da26-4a5e-aa77-e00f3540eb81" />

7. Save
