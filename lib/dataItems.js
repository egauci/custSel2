/*
 * Example menuItems objects for CustSelect.
 *
 * Each object has one array of objects. Each
 * member of the array is an object with two required
 * properties: label and value. The value property must
 * be unique in the entire list (not just its sublist).
 * Any object may also have an optional children property.
 * Objects with a children property are group headers and
 * cannot be selected.
 */

const output = {
  children: [
    {
      label: 'View in Browser (HTML)',
      value: '1'
    },
    {
      label: 'PDF',
      value: '2'
    },
    {
      label: 'CSV',
      value: '3'
    },
    {
      label: 'Excel',
      value: '4'
    },
    {
      label: 'BAI v2',
      value: '5'
    }
  ]
};

const dateItems = {
  children: [
    {
      label: 'Previous Day Composite',
      value: '1'
    },
    {
      label: 'Next Business Day',
      value: '2'
    },
    {
      label: 'Last Monday',
      value: '3'
    },
    {
      label: 'Last Tuesday',
      value: '4'
    },
    {
      label: 'last Wednesday',
      value: '5'
    },
    {
      label: 'Last Thursday',
      value: '6'
    },
    {
      label: 'Last Friday',
      value: '7'
    },
    {
      label: 'Last Week (business days)',
      value: '8'
    },
    {
      label: 'Last 5 business Days',
      value: '9'
    },
    {
      label: 'Last Month',
      value: '10'
    },
    {
      label: 'Month to Date',
      value: '11'
    },
    {
      label: 'Date Range',
      value: '12'
    },
    {
      label: 'Current Business Day',
      value: '13'
    },
    {
      label: 'Transactions Since Last Report (current business day)',
      value: '14'
    },
    {
      label: 'Only future Dated',
      value: '15'
    },
    {
      label: 'Current plus Next Business Day',
      value: '16'
    },
    {
      label: 'Custom Date',
      value: '17'
    }
  ]
};

const menuItems = {
  children: [
    {
      label: 'Item 1',
      value: '1'
    },
    {
      label: 'Item 2',
      value: '2'
    },
    {
      label: 'Item 3',
      value: '3'
    },
    {
      label: 'Item 4',
      value: '4'
    },
    {
      label: 'Item 5',
      value: '5',
      children: [
        {
          label: 'Item 5.1 - 1',
          value: '5.1-1'
        },
        {
          label: 'Item 5.1 - 2',
          value: '5.1-2',
          children: [
            {
              label: 'Item 5.2 - 1',
              value: '5.2-1'
            },
            {
              label: 'Item 5.2 - 2',
              value: '5.2-2'
            }
          ]
        }
      ]
    },
    {
      label: 'Item 6',
      value: '6'
    },
    {
      label: 'Item 7',
      value: '7'
    }
  ]
};

const states = {
  children: [
    {label: 'Alabama', value: 'AL'},
    {label: 'Alaska', value: 'AK'},
    {label: 'Arizona', value: 'AZ'},
    {label: 'Arkansas', value: 'AR'},
    {label: 'California', value: 'CA'},
    {label: 'Colorado', value: 'CO'},
    {label: 'Connecticut', value: 'CT'},
    {label: 'Delaware', value: 'DE'},
    {label: 'Florida', value: 'FL'},
    {label: 'Georgia', value: 'GA'},
    {label: 'Hawaii', value: 'HI'},
    {label: 'Idaho', value: 'ID'},
    {label: 'Illinois', value: 'IL'},
    {label: 'Indiana', value: 'IN'},
    {label: 'Iowa', value: 'IA'},
    {label: 'Kansas', value: 'KS'},
    {label: 'Kentucky', value: 'KY'},
    {label: 'Louisiana', value: 'LA'},
    {label: 'Maine', value: 'ME'},
    {label: 'Maryland', value: 'MD'},
    {label: 'Massachusetts', value: 'MA'},
    {label: 'Michigan', value: 'MI'},
    {label: 'Minnesota', value: 'MN'},
    {label: 'Mississippi', value: 'MS'},
    {label: 'Missouri', value: 'MO'},
    {label: 'Montana', value: 'MT'},
    {label: 'Nebraska', value: 'NE'},
    {label: 'Nevada', value: 'NV'},
    {label: 'New Hampshire', value: 'NH'},
    {label: 'New Jersey', value: 'NJ'},
    {label: 'New Mexico', value: 'NM'},
    {label: 'New York', value: 'NY'},
    {label: 'North Carolina', value: 'NC'},
    {label: 'North Dakota', value: 'ND'},
    {label: 'Ohio', value: 'OH'},
    {label: 'Oklahoma', value: 'OK'},
    {label: 'Oregon', value: 'OR'},
    {label: 'Pennsylvania', value: 'PA'},
    {label: 'Rhode Island', value: 'RI'},
    {label: 'South Carolina', value: 'SC'},
    {label: 'South Dakota', value: 'SD'},
    {label: 'Tennessee', value: 'TN'},
    {label: 'Texas', value: 'TX'},
    {label: 'Utah', value: 'UT'},
    {label: 'Vermont', value: 'VT'},
    {label: 'Virginia', value: 'VA'},
    {label: 'Washington', value: 'WA'},
    {label: 'West Virginia', value: 'WV'},
    {label: 'Wisconsin', value: 'WI'},
    {label: 'Wyoming', value: 'WY'}
  ]
};

const banks = {
  children: [
    {
      label: 'Old National Bancorp',
      value: '81443-704'
    },
    {
      label: 'Wilmington Trust',
      value: '02135-284'
    },
    {
      label: 'East West Bancorp Inc.',
      value: '26275-383'
    },
    {
      label: 'EverBank Financial Corp.',
      value: '14473-558'
    },
    {
      label: 'Apple Financial Holdings International Inc.',
      value: '61866-632'
    },
    {
      label: 'Iberiabank Corp.',
      value: '81273-739'
    },
    {
      label: 'First Merchants Corp',
      value: '86312-446'
    },
    {
      label: 'FirstFed Financial Corp.',
      value: '97388-346'
    }
  ]
};

export {output, dateItems, menuItems, states, banks};
