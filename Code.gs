function extractPLDTeInvoice() {
  const labelName = 'Recorded in Sheet';
  const sheetName = 'PLDT';

  const recordedLabel = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet "${sheetName}" not found.`);

  const threads = GmailApp.search('from:pldthome@pldt.com.ph subject:"PLDT Electronic Statement" -label:"' + labelName + '"');

  for (const thread of threads) {
    const messages = thread.getMessages();
    for (const message of messages) {
      if (message.isDraft()) continue;

      const htmlBody = message.getBody();

      // Match each <table> block
      const tableRegex = /<table[^>]*?>[\s\S]*?<\/table>/g;
      const tables = [...htmlBody.matchAll(tableRegex)];

      let extracted = {
        telephoneNumber: '',
        invoiceDate: '',
        accountName: '',
        currentCharges: '',
        dueDate: '',
        totalAmountDue: '',
      };

      for (const tableMatch of tables) {
        const tableHtml = tableMatch[0];

        const labelMatch = tableHtml.match(/<b>([^<]*)<\/b>\s*<\/font>/i);
        const valueMatch = [...tableHtml.matchAll(/<td[^>]*>\s*<div[^>]*>\s*<font[^>]*>\s*<b>([^<]*)<\/b>/gi)];

        if (!labelMatch || valueMatch.length < 2) continue;

        const label = labelMatch[1].trim().toLowerCase();
        const value = valueMatch[valueMatch.length - 1][1].replace(/&#44;/g, ',').trim(); // get the last <b>value</b>

        switch (label) {
          case 'telephone number':
            extracted.telephoneNumber = value;
            break;
          case 'invoice date':
          case 'statement date':
            extracted.invoiceDate = value;
            break;
          case 'account name':
            extracted.accountName = value;
            break;
          case 'current charges':
            extracted.currentCharges = value;
            break;
          case 'due date':
            extracted.dueDate = value;
            break;
          case 'total amount due':
            extracted.totalAmountDue = value;
            break;
        }
      }

      const allValues = Object.values(extracted);
      if (allValues.every(v => v === '')) {
        Logger.log("Warning: No values extracted from this email.");
        continue;
      }

      Logger.log("Extracted PLDT eInvoice:");
      Object.entries(extracted).forEach(([key, val]) => Logger.log(`${key}: ${val}`));

      sheet.appendRow([
        extracted.telephoneNumber,
        extracted.invoiceDate,
        extracted.accountName,
        extracted.currentCharges,
        extracted.totalAmountDue,
        extracted.dueDate,
        new Date()
      ]);

      thread.addLabel(recordedLabel);
      Logger.log('Row inserted into sheet successfully. Email thread labeled as "Recorded in Sheet".');
      break;
    }
  }
}
