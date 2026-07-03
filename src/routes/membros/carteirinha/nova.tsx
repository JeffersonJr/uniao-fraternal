import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { saveMember } from "@/lib/members-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowLeft, Upload, User, FileText, Calendar, Mail, Compass } from "lucide-react";

export const Route = createFileRoute("/membros/carteirinha/nova")({
  head: () => ({
    meta: [
      { title: "Gerar Carteirinha Virtual — A.R.L.S. União Fraternal Nº 120" },
      { name: "description", content: "Cadastre seus dados e foto para emitir sua carteirinha de membro virtual." },
    ],
  }),
  component: NewMembershipCard,
});

function NewMembershipCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "Mestre Maçom",
    cim: "",
    initiationDate: "",
    email: "",
  });
  const [photoBase64, setPhotoBase64] = useState<string>("");
  const [photoName, setPhotoName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("A foto deve ter no máximo 2MB.");
        return;
      }
      setPhotoName(file.name);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.cim || !formData.initiationDate || !formData.email) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const created = saveMember({
        name: formData.name,
        role: formData.role,
        cim: formData.cim,
        initiationDate: formData.initiationDate,
        email: formData.email,
        photo: photoBase64 || "",
      });

      // Redirect to the newly generated card
      navigate({ to: `/membros/carteirinha/${created.id}` });
    } catch (err) {
      setError("Ocorreu um erro ao salvar a carteirinha. Verifique seus dados.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Back button */}
          <Link
            to="/membros"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
          </Link>

          {/* Page Header */}
          <div className="mb-10 animate-fade-up">
            <p className="text-primary/70 font-bold uppercase tracking-[0.3em] text-xs mb-2">Secretaria da Loja</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-primary">
              Criar Carteirinha Virtual
            </h1>
            <div className="gold-divider w-24 mt-4" />
          </div>

          {/* Form Card */}
          <div
            className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-elegant animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Photo Upload Area */}
              <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-border/60">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-gold/45 shadow bg-black/5 flex items-center justify-center flex-shrink-0">
                  {photoBase64 ? (
                    <img src={photoBase64} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gold/60" />
                  )}
                </div>
                <div className="flex-grow text-center md:text-left space-y-2">
                  <h3 className="font-semibold text-primary">Foto da Carteirinha</h3>
                  <p className="text-xs text-muted-foreground">
                    Carregue uma imagem nítida com fundo claro (formatos JPG ou PNG, máx 2MB).
                  </p>
                  <div className="relative inline-block">
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button type="button" variant="outline" className="border-gold/30 hover:bg-gold/5 text-primary text-xs h-9">
                      <Upload className="w-3.5 h-3.5 mr-2 text-gold" />
                      Selecionar Arquivo
                    </Button>
                  </div>
                  {photoName && <span className="text-xs text-muted-foreground ml-3 block md:inline">{photoName}</span>}
                </div>
              </div>

              {/* Form Input fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full name */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gold" /> Nome Completo
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jefferson Campos Beira Junior"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-11 bg-background border-border hover:border-gold/30 focus-visible:ring-gold"
                  />
                </div>

                {/* Role / Degree */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-gold" /> Grau Maçônico
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-11 px-3 rounded-md bg-background border border-border text-foreground hover:border-gold/30 focus:border-gold focus:outline-none text-sm transition-colors"
                  >
                    <option value="Aprendiz Maçom">Aprendiz Maçom</option>
                    <option value="Companheiro Maçom">Companheiro Maçom</option>
                    <option value="Mestre Maçom">Mestre Maçom</option>
                  </select>
                </div>

                {/* CIM number */}
                <div className="space-y-2">
                  <Label htmlFor="cim" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gold" /> CIM (Identidade Maçônica)
                  </Label>
                  <Input
                    type="text"
                    id="cim"
                    name="cim"
                    placeholder="32071"
                    value={formData.cim}
                    onChange={handleChange}
                    required
                    className="h-11 bg-background border-border hover:border-gold/30 focus-visible:ring-gold"
                  />
                </div>

                {/* Initiation Date */}
                <div className="space-y-2">
                  <Label htmlFor="initiationDate" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold" /> Data de Iniciação
                  </Label>
                  <Input
                    type="text"
                    id="initiationDate"
                    name="initiationDate"
                    placeholder="09 de Agosto de 2020"
                    value={formData.initiationDate}
                    onChange={handleChange}
                    required
                    className="h-11 bg-background border-border hover:border-gold/30 focus-visible:ring-gold"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gold" /> E-mail
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jefferson@arlsuniaofraternal.com.br"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11 bg-background border-border hover:border-gold/30 focus-visible:ring-gold"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row gap-3 justify-end">
                <Button asChild variant="outline" className="border-border text-muted-foreground hover:bg-secondary h-11 px-6">
                  <Link to="/membros">Cancelar</Link>
                </Button>
                <Button type="submit" className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold font-medium h-11 px-8">
                  Gerar Carteirinha Virtual
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
