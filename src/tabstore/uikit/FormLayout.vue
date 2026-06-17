<script setup>
import { ref } from 'vue'

const dropdownItems = ref([
  { name: 'Option 1', code: 'Option 1' },
  { name: 'Option 2', code: 'Option 2' },
  { name: 'Option 3', code: 'Option 3' },
])

const dropdownItem = ref(null)
</script>

<template>
  <Fluid>
    <div class="flex-col gap-8 flex md:flex-row">
      <div class="md:w-1/2">
        <div class="card flex-col gap-4 flex">
          <div class="text-xl font-semibold">Vertical</div>
          <div class="flex-col gap-2 flex">
            <label for="name1">Name</label>
            <InputText
              id="name1"
              type="text"
            />
          </div>
          <div class="flex-col gap-2 flex">
            <label for="email1">Email</label>
            <InputText
              id="email1"
              type="text"
            />
          </div>
          <div class="flex-col gap-2 flex">
            <label for="age1">Age</label>
            <InputText
              id="age1"
              type="text"
            />
          </div>
        </div>

        <div class="card flex-col gap-4 flex">
          <div class="text-xl font-semibold">Vertical Grid</div>
          <div class="flex-wrap gap-4 flex">
            <div class="flex-col gap-2 flex grow basis-0">
              <label for="name2">Name</label>
              <InputText
                id="name2"
                type="text"
              />
            </div>
            <div class="flex-col gap-2 flex grow basis-0">
              <label for="email2">Email</label>
              <InputText
                id="email2"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/2">
        <div class="card flex-col gap-4 flex">
          <div class="text-xl font-semibold">Horizontal</div>
          <div class="gap-2 grid grid-cols-12">
            <label
              for="name3"
              class="mb-2 flex items-center col-span-12 md:col-span-2 md:mb-0"
            >
              Name
            </label>
            <div class="col-span-12 md:col-span-10">
              <InputText
                id="name3"
                type="text"
              />
            </div>
          </div>
          <div class="gap-2 grid grid-cols-12">
            <label
              for="email3"
              class="mb-2 flex items-center col-span-12 md:col-span-2 md:mb-0"
            >
              Email
            </label>
            <div class="col-span-12 md:col-span-10">
              <InputText
                id="email3"
                type="text"
              />
            </div>
          </div>
        </div>

        <div class="card flex-col gap-4 flex">
          <div class="text-xl font-semibold">Inline</div>
          <div class="flex-wrap gap-4 flex items-start">
            <div class="field">
              <label
                for="firstname1"
                class="sr-only"
              >
                Firstname
              </label>
              <InputText
                id="firstname1"
                type="text"
                placeholder="Firstname"
              />
            </div>
            <div class="field">
              <label
                for="lastname1"
                class="sr-only"
              >
                Lastname
              </label>
              <InputText
                id="lastname1"
                type="text"
                placeholder="Lastname"
              />
            </div>
            <Button
              label="Submit"
              :fluid="false"
            />
          </div>
        </div>
        <div class="card flex-col gap-4 flex">
          <div class="text-xl font-semibold">Help Text</div>
          <div class="flex-wrap gap-2 flex">
            <label for="username">Username</label>
            <InputText
              id="username"
              type="text"
            />
            <small>Enter your username to reset your password.</small>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 flex">
      <div class="card w-full flex-col gap-4 flex">
        <div class="text-xl font-semibold">Advanced</div>
        <div class="flex-col gap-4 flex md:flex-row">
          <div class="w-full flex-wrap gap-2 flex">
            <label for="firstname2">Firstname</label>
            <InputText
              id="firstname2"
              type="text"
            />
          </div>
          <div class="w-full flex-wrap gap-2 flex">
            <label for="lastname2">Lastname</label>
            <InputText
              id="lastname2"
              type="text"
            />
          </div>
        </div>

        <div class="flex-wrap flex">
          <label for="address">Address</label>
          <Textarea
            id="address"
            rows="4"
          />
        </div>

        <div class="flex-col gap-4 flex md:flex-row">
          <div class="w-full flex-wrap gap-2 flex">
            <label for="state">State</label>
            <Select
              id="state"
              v-model="dropdownItem"
              :options="dropdownItems"
              option-label="name"
              placeholder="Select One"
              class="w-full"
            />
          </div>
          <div class="w-full flex-wrap gap-2 flex">
            <label for="zip">Zip</label>
            <InputText
              id="zip"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  </Fluid>
</template>
