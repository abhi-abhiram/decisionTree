import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Box, Input, useColorModeValue } from '@chakra-ui/react';

let value = '';

export function getValue() {
  return value;
}

export default function Example({
  elements,
}: {
  elements: { _id: string; name: string }[];
}) {
  const [selected, setSelected] = useState(elements[0]);
  const [query, setQuery] = useState('');
  const searchBgColor = useColorModeValue(
    'var(--chakra-colors-gray-200)',
    'var(--chakra-colors-gray-700)'
  );

  useEffect(() => {
    value = selected._id;
  }, [selected]);

  const filteredPeople =
    query === ''
      ? elements
      : elements.filter((element) =>
          element.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <Box position='relative'>
        <Box display='none'>
          <Input />
        </Box>
        <Combobox.Input
          className='chakra-input css-xpongc'
          displayValue={(element) => {
            return (element as unknown as { name: string }).name;
          }}
          onChange={(event) => setQuery(event.target.value)}
        />

        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            style={{
              position: 'absolute',
              maxHeight: '60',
              width: '100%',
              overflow: 'auto',
              background: searchBgColor,
              zIndex: '1',
              marginTop: '5px',
              borderWidth: '1px',
              borderRadius: '5px',
            }}
          >
            {filteredPeople.length === 0 && query !== '' ? (
              <Box position='relative' cursor='default'>
                Nothing found.
              </Box>
            ) : (
              filteredPeople.map((element) => (
                <Combobox.Option
                  key={element._id}
                  style={{
                    position: 'relative',
                    cursor: 'default',
                    userSelect: 'none',
                  }}
                  value={element}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        style={{
                          display: 'block',
                          background: active
                            ? 'var(--chakra-colors-gray-500)'
                            : '',
                          paddingTop: '2px',
                          paddingBottom: '2px',
                          paddingLeft: '10px',
                          paddingRight: '4px',
                        }}
                      >
                        {element.name}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Box>
    </Combobox>
  );
}
