<template>
  <div class="min-h-screen flex justify-center items-start bg-gray-50 pt-24">
    <form
      @submit.prevent="submitForm"
      class="w-full max-w-lg bg-white p-8 shadow-lg rounded-xl space-y-6"
    >
      <h1 class="text-3xl font-bold text-center text-gray-800">
        {{ isEdit ? "Edit Contact" : "New Contact" }}
      </h1>

      <!-- Name -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="John Doe"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
      </div>

      <!-- Contact -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Contact</label>
        <div class="flex gap-2">
          <select
            v-model="form.country_code"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="+55">+55 (BR)</option>
            <option value="+1">+1 (US)</option>
          </select>
          <input
            v-model="form.contact"
            @input="maskPhone"
            type="text"
            placeholder="Phone number"
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
      </div>

      <!-- Email -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="email@example.com"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        {{ isEdit ? "Update" : "Save" }}
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useContactStore } from "../stores/contactStore";

export default {
  setup() {
    const contactStore = useContactStore();
    const route = useRoute();
    const router = useRouter();

    const isEdit = computed(() => !!route.params.id);

    const form = reactive({
      name: "",
      country_code: "+55",
      contact: "",
      email: "",
    });

    const loadContact = async () => {
      if (isEdit.value) {
        await contactStore.fetchContact(route.params.id);
        const c = contactStore.contact;
        if (c) {
          form.name = c.name;
          form.email = c.email;
          if (c.contact.startsWith("+1")) {
            form.country_code = "+1";
            form.contact = c.contact.replace("+1", "").trim();
          } else {
            form.country_code = "+55";
            form.contact = c.contact.replace("+55", "").trim();
          }
        }
      }
    };

    const maskPhone = () => {
      let digits = form.contact.replace(/\D/g, "");
      if (form.country_code === "+55") {
        if (digits.length > 11) digits = digits.slice(0, 11);
        if (digits.length <= 2) form.contact = `(${digits}`;
        else if (digits.length <= 7)
          form.contact = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        else
          form.contact = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      } else if (form.country_code === "+1") {
        if (digits.length > 10) digits = digits.slice(0, 10);
        if (digits.length <= 3) form.contact = `(${digits}`;
        else if (digits.length <= 6)
          form.contact = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        else
          form.contact = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
    };

    const validateContact = () => {
      const digits = form.contact.replace(/\D/g, "");
      if (form.country_code === "+55" && digits.length !== 11) {
        alert("Brazilian contact must have 11 digits");
        return false;
      }
      if (form.country_code === "+1" && digits.length !== 10) {
        alert("US contact must have 10 digits");
        return false;
      }
      form.contact = form.country_code + digits;
      return true;
    };

    const submitForm = async () => {
      if (!validateContact()) return;
      try {
        if (isEdit.value) {
          await contactStore.updateContact(route.params.id, form);
        } else {
          await contactStore.createContact(form);
        }
        router.push("/");
      } catch (err) {
        alert("Error saving contact!");
      }
    };

    onMounted(loadContact);

    return { form, submitForm, isEdit, maskPhone };
  },
};
</script>
